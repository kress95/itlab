import * as React from 'react'
import Entry from './entry'
import AppState from '../data/appState'

/**
 * Retorna o estado inicial do App.
 */
function getAppState() {
  return fetch('/api/order/list').then(response => response.json())
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {orders: []} as Readonly<AppState>
  }

  /**
   * Handler dos botões da lista de `Entry`.
   */
  handleSubmit = async () => {
    this.setState(await getAppState())
  }

  async componentDidMount() {
    this.setState(await getAppState())
  }

  render() {
    const constraints = this.state.constraints

    if (constraints == null) {
      return <p>Carregando...</p>
    }

    const handleSubmit = this.handleSubmit
    const orders = this.state.orders

    return (
      <div>
        <Entry onSubmit={handleSubmit} constraints={constraints} />
        {orders.map(o => (
          <Entry
            key={o.id}
            order={o}
            onSubmit={handleSubmit}
            constraints={constraints}
          />
        ))}
      </div>
    )
  }
}
