import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styles from "./groupassociator.module.css"
import classNames from "classnames"
import {  motion } from "framer-motion"
import axios from "axios"

const GroupAssociator: React.FC<{
  transactionSlug: string
}> = ({ transactionSlug }) => {
  const groupIcons: {
    join: File,
    new: File,
    leave: File
  } = useStaticQuery(graphql`
    query {
      join: file(relativePath: { eq: "group-join.svg" }) {
        publicURL
      }
      leave: file(relativePath: { eq: "group-leave.svg" }) {
        publicURL
      }
      new: file(relativePath: { eq: "group-new.svg" }) {
        publicURL
      }
    }
  `)
  const [refreshGroups, setRefreshGroups] = useState(0)
  const groups = useAllGroups(transactionSlug, refreshGroups)

  const [allGroupsShown, setAllGroupsShown] = useState(false)
  const shownGroups = groups !== null ? (
    allGroupsShown ? groups.groups : groups.groups.slice(0, 3)
  ) : []

  const putNewGroupNameAndRefreshGroups = async (groupName: string) => {
    await axios.put(
      `${process.env.GATSBY_DONATIONDB_URL}/payments/transaction/${transactionSlug}/group`, groupName)
    setRefreshGroups(refreshGroups + 1)
  }

  const [canSubmitNewGroup, setCanSubmitNewGroup] = useState(true)
  const [newGroupName, setNewGroupName] = useState("")
  const submitNewGroupName = () => {
    setCanSubmitNewGroup(false)

    putNewGroupNameAndRefreshGroups(newGroupName)
  }

  return (
    <div className={styles.groupassociator} >
      {canSubmitNewGroup && (
        <>
          <form className={styles.group} onSubmit={(event) => {
            event.preventDefault()
            submitNewGroupName()
          }}>
            <input
              type="text"
              placeholder="Namn på ny grupp"
              value={newGroupName}
              onChange={(event) => { setNewGroupName(event.target.value)} }
            />
            <motion.button type="submit" whileHover={{ scale: 1.1 }}><img src={groupIcons.new.publicURL} /></motion.button>
          </form>
        </>
      )}
      {shownGroups.map((group, index) => (
        <div key={group.name} className={styles.groupAndHr}>
          <Group
            groupIcons={groupIcons}
            description={group}
            onMembershipToggle={(newIsMember) => {
              const groupName = newIsMember ? group.name : ""
              putNewGroupNameAndRefreshGroups(groupName)
            }}
          />
          {index != shownGroups.length - 1 && <hr />}
        </div>
      ))}
      {shownGroups.length != groups?.groups.length &&
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault()
            setAllGroupsShown(true)
          }}
        >
          <small>Visa alla grupper</small>
        </a>
      }
    </div>
  )
}

const Group: React.FC<GroupProps> = ({ description, onMembershipToggle, groupIcons }) => {
  const icon = description.isMember ? groupIcons.leave : groupIcons.join
  return (
    <div className={styles.group}>
      <div>
        <h3>{description.isMember ? (<strong>{description.name}</strong>) : description.name}</h3>
        <p>{description.members.join(", ")}</p>
      </div>
      <motion.button
        className={classNames({ [styles.secondary]: description.isMember })}
        whileHover={{ scale: 1.1 }}
        onClick={() => {
          onMembershipToggle(!description.isMember)
        }}
      >
        <img src={icon.publicURL} alt={description.isMember ? "Lämna gruppen" : "Gå med i gruppen"} />
      </motion.button>
    </div>
  )
}

interface GroupProps {
  description: GroupDescription
  onMembershipToggle: (newIsMember: boolean) => void
  groupIcons: {
    join: File
    leave: File
  }
}

export interface GroupResponse {
  others: string[]
  groups: GroupDescription[]
}

export interface GroupDescription {
  name: string
  members: string[]
  isMember: boolean
}

const useAllGroups = (transactionSlug: string, refreshGroups: number) => {
  const [allGroups, setAllGroups] = useState<GroupResponse | null>(null)

  useEffect(() => {
    const fetchAllGroups = async () => {
      const result = await axios.get(`${process.env.GATSBY_DONATIONDB_URL}/donations/groups?checkout-transaction-id=${transactionSlug}`)
      setAllGroups(result.data)
    }
    fetchAllGroups()
  }, [refreshGroups])

  return allGroups
}

interface File {
  publicURL: string
}

export default GroupAssociator
