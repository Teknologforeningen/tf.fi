import React from 'react'
import Column from './Column'

const TFInfo = () => {
  return (
    <Column className="text-black">
      <h1 className="text-3xl font-bold">Vad är TF?</h1>
      <p className="max-w-[1200px] py-3">
        Vad är TF? Teknologföreningen, TF, är den svenskspråkiga nationen vid
        Aalto-universitetet. Nationen grundades 1872. TF:s ändamål är att
        sammanföra svenskspråkiga studerande vid Aalto-universitetet. I och med
        att TF äger sitt eget nationshus, Urdsgjallar, är förutsättningarna
        ypperliga för att sköta denna uppgift väl. En minst lika viktig uppgift
        för TF är att bevaka de svenskspråkiga teknologernas idéella och
        samhälleliga intressen. TF ser även till att studierna på svenska
        uppfyller de krav som ställs och att medlemskårens studietid berikas med
        allt som ett ymnigt nationsliv innebär.
      </p>
    </Column>
  )
}

export default TFInfo
