import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, onSelectLanguage, isActive} = props

  const {language, id} = eachLanguage

  const onClickLanguage = () => {
    onSelectLanguage(id)
  }

  const activeLanguageClassName = isActive
    ? 'language-button active-language-button'
    : 'language-button'

  return (
    <li className="language-list-item">
      <button
        onClick={onClickLanguage}
        type="button"
        className={activeLanguageClassName}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
