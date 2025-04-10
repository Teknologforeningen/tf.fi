import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { update } from "lodash"
import React, { useEffect, useMemo, useState } from "react"
import useDebounced from "../../hooks/useDebounced"
import styles from "./addressform.module.css"

const AddressForm: React.FC<{
    initialAddress: Address
    transactionSlug: string
}> = ({ initialAddress, transactionSlug }) => {
    const [address, setAddress] = useState<Address>(initialAddress)

    const saveState = useAutomaticSavingForAddressChanges(
        transactionSlug,
        initialAddress,
        address
    )

    return (
        <form
            className={styles.addressForm}
            onSubmit={(event) => event.preventDefault()}
        >
            <div className={styles.inputGroup}>
                <label htmlFor="address-street">Gata</label>
                <input
                    type="text"
                    id="address-street"
                    placeholder="Otsvängen 22"
                    value={address.street}
                    onChange={(event) => setAddress({ ...address, street: event.target.value })}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="address-zip-code">Postnummer</label>
                <input
                    type="text"
                    id="address-zip-code"
                    placeholder="02150"
                    value={address.zipCode}
                    onChange={(event) => setAddress({ ...address, zipCode: event.target.value })}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="address-city">Ort</label>
                <input
                    type="text"
                    id="address-city"
                    placeholder="Esbo"
                    value={address.city}
                    onChange={(event) => setAddress({ ...address, city: event.target.value })}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="address-country">Land</label>
                <input
                    type="text"
                    id="address-country"
                    placeholder="Finland"
                    value={address.country}
                    onChange={(event) => setAddress({ ...address, country: event.target.value })}
                />
            </div>
            <AnimatePresence exitBeforeEnter>
                <motion.p
                  key={saveState}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                    <small>
                        {saveState === SaveState.Initial ? (
                            "Fyll i alla fält"
                        ) : saveState === SaveState.Saved ? (
                            "Dina adressuppgifter har sparats!"
                        ) : (
                            "Ett fel inträffade, adressen kunde inte sparas. Kontakta FUN-chefen ifall felet återkommer."
                        )}
                    </small>
                </motion.p>
            </AnimatePresence>
        </form>
    )
}

enum SaveState {
    Initial,
    Saved,
    Error
}

const useAutomaticSavingForAddressChanges = (
    transactionSlug: string,
    initialAddress: Address,
    address: Address
): SaveState => {
    const [state, setState] = useState<SaveState>(SaveState.Initial)

    const debouncedAddress = useDebounced(address, 2000)

    useEffect(() => {
        const initialState = (initialAddress == address && areAllFieldsFilled(address)) ? SaveState.Saved : SaveState.Initial
        setState(initialState)
    }, [address])

    useEffect(() => {
        if (
            !areAllFieldsFilled(debouncedAddress) ||
            initialAddress === debouncedAddress
        ) {
            return
        }

        const updateAddress = async () => {
            try {
                await axios.post(
                    `${process.env.GATSBY_DONATIONDB_URL}/payments/transaction/${transactionSlug}/address`,
                    debouncedAddress
                )
                setState(SaveState.Saved)
            } catch (exception) {
                console.error("Unable to post new address", exception)
                setState(SaveState.Error)
            }
        }

        updateAddress()
    }, [debouncedAddress])

    return state
}

export interface Address {
    street: string
    zipCode: string
    city: string
    country: string
}

const areAllFieldsFilled = (address: Address) => (
    Object.values(address).reduce((allNonEmpty, current) => (allNonEmpty && current != ""), true)
)

export default AddressForm
