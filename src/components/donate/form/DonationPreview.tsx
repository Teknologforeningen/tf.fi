import { Donation } from '@models/donate'
import { VisibilityType } from './Visibility'

export const DonationPreview = ({ donation, action }: { donation: Donation; action?: (fd: FormData) => void }) => {
  let visibilityText: string
  if (donation.visibility.type === VisibilityType.visible) {
    visibilityText = 'Synlig'
  } else if (donation.visibility.type === VisibilityType.pseudonym) {
    visibilityText = donation.visibility.value
  } else {
    visibilityText = 'Anonym'
  }

  return (
    <form>
      <fieldset className="border border-darkgray not-prose p-4 pb-8 flex flex-col">
        <legend>
          <span className="px-2 text-lg font-bold uppercase">Donationsuppgifter</span>
          {action && (
            <button
              type="submit"
              formAction={action}
              className="bg-darkgray text-white rounded-2xl py-1 px-4 mx-2 text-sm"
            >
              Ändra
            </button>
          )}
        </legend>
        <div className="flex flex-col text-lg">
          <p>
            För- och efternamn: <i>{donation.name}</i>
          </p>
          <p>
            Synlighet: <i>{visibilityText}</i>
          </p>
          <p>
            E-post: <i>{donation.email}</i>
          </p>
          {donation.phone && (
            <p>
              Telefonnummer: <i>{donation.phone}</i>
            </p>
          )}
          <p>
            Summa: <i>{donation.amount}</i> €
          </p>
        </div>
      </fieldset>
    </form>
  )
}
