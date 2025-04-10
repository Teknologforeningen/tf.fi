import axios from "axios"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { GroupDescription, GroupResponse } from "./donate/groupassociator"
import styles from "./donorlist.module.css"

const DonorList: React.FC<DonorListProps> = ({ listTitle }) => {
  const groups = useGroups()

  return (
    <div className={styles.container}>
      <h2>{listTitle}</h2>
      {groups ? (
        <fieldset>
          <Donors groups={groups} />
        </fieldset>
      ) : (
        <p>Hämtar donationer...</p>
      )}
    </div>
  )
}

const useGroups = () => {
  const [allDonations, setAllDonations] = useState<GroupResponse | null>(null)

  const fetchAllDonations = async () => {
    try {
      const response = await axios.get(`${process.env.GATSBY_DONATIONDB_URL}/donations/groups`)
      setAllDonations(response.data)
    } catch (exception) {
      console.warn("Unable to fetch donations", exception)
    }
  }

  useEffect(() => {
    fetchAllDonations()
  }, [])

  return allDonations
}

const Donors: React.FC<{ groups: GroupResponse }> = ({ groups }) => {
  const groupsAndOthers = [...groups.groups, ...groups.others]
  groupsAndOthers.sort((a, b) => {
    const aName = typeof(a) === "string" ? a : a.name
    const bName = typeof(b) === "string" ? b : b.name
    return aName < bName ? -1 : 1
  })
  const chunkedGroupsAndOthers = groupsAndOthers.reduce((previous, groupOrOther) => {
    if (typeof(groupOrOther) === "string") {
      if (previous.length == 0) {
        previous.push({
          name: "",
          isMember: false,
          members: [groupOrOther]
        })
      } else {
        const lastGroup = previous[previous.length - 1]
        if (lastGroup.name == "") {
          lastGroup.members.push(groupOrOther)
        } else {
          previous.push({
            name: "",
            isMember: false,
            members: [groupOrOther]
          })
        }
      }
    } else {
      previous.push(groupOrOther)
    }
    return previous
  }, [] as GroupDescription[])
  return (
    <>
      {chunkedGroupsAndOthers.map((chunk) => (
        <div key={chunk.members.join("-")}>
          {chunk.name != "" && <h3>{chunk.name}</h3>}
          <motion.ul layout>
            {chunk.members.map((donor, index) => (
              <li key={`${index}-${donor}`}>{donor}</li>
            ))}
          </motion.ul>
        </div>
      ))}
    </>
  )
}

export interface DonorListProps {
  sys: {
    contentType: {
      sys: {
        id: "donorList"
      }
    }
  }
  listTitle: string
}

export default DonorList
