const AutocompleItem = ({ name, coatOfArms }) => {
  const hasFlag = coatOfArms?.svg || coatOfArms?.png

  return (
    <li className="text-black flex items-center gap-3 p-4">
      {hasFlag ? (
        <img
          className="w-7 h-7 object-cover"
          src={coatOfArms.svg ?? coatOfArms.png}
        />
      ) : null}
      <span>{name?.common ?? 'nameless'}</span>
    </li>
  )
}

export default AutocompleItem
