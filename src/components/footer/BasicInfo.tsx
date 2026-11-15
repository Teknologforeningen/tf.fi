import Column from '../Column'

const year = new Date().getFullYear()

const BasicInfo = () => (
  <Column className="text-white">
    <p className="text-l font-bold">Kontakt</p>
    <Column className="items-center text-sm">
      <p>Otsvängen 22 02150 Esbo</p>
      <p>Styrelsen: tfs@tf.fi</p>
      <p>Kansli: kansli@tf.fi</p>
    </Column>
    <p>&#169; {year}</p>
  </Column>
)

export default BasicInfo
