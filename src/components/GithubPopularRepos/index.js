import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguage: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
    repositories: [],
  }

  componentDidMount() {
    this.getGithubRepositories()
  }

  onSelectLanguage = languageId => {
    this.setState({activeLanguage: languageId}, this.getGithubRepositories)
  }

  getGithubRepositories = async () => {
    const {activeLanguage} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`

   

    const response = await fetch(githubReposApiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        repositories: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLanguagesFilterData = () => {
    const {activeLanguage} = this.state

    return (
      <ul className="language-list-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            onSelectLanguage={this.onSelectLanguage}
            eachLanguage={eachLanguage}
            key={eachLanguage.id}
            isActive={eachLanguage.id === activeLanguage}
          />
        ))}
      </ul>
    )
  }

  renderGithubRepositories = () => {
    const {repositories} = this.state
    return (
      <ul className="repositories-container">
        {repositories.map(eachRepo => (
          <RepositoryItem eachRepo={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderNoRepositoriesView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <h1>SOMETHING WENT WRONG</h1>
    </div>
  )

  renderGithubRepoViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGithubRepositories()
      case apiStatusConstants.failure:
        return this.renderNoRepositoriesView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return this.renderGithubRepositories()
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        {this.renderLanguagesFilterData()}
        {this.renderGithubRepoViews()}
      </div>
    )
  }
}

export default GithubPopularRepos
