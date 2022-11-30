import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {avatarUrl, starsCount, issuesCount, forksCount, name} = eachRepo
  return (
    <li className="repo-list-item">
      <img className="avatar-image" src={avatarUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <div className="item-card">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="item-card">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="item-card">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
