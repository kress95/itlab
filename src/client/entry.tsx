import * as React from 'react'
import {Constraints} from '../data/appState'
import Order from '../data/order'

interface EntryProps {
  constraints: Constraints
  order?: Order
  onSubmit?: () => any
}

interface EntryState {
  id?: string
  clientName: string
  date: string
  value: number
  productId: string
  paymentMethodId: string
  services: Set<string>
  changed: boolean
  error?: string
}

/**
 * Deixa data no formato do datetime-local.
 */
function toDateTime(date: Date) {
  return date.toISOString().slice(0, 16)
}

/**
 * Retorna um estado inicial válido para o componente.
 */
function getInitialState(c: Constraints) {
  return {
    clientName: '',
    date: toDateTime(new Date()),
    value: 0,
    productId: c.products[0].id,
    paymentMethodId: c.paymentMethods[0].id,
    services: new Set(),
    changed: true,
  } as Readonly<EntryState>
}

export default class Entry extends React.Component<EntryProps, EntryState> {
  constructor(props: EntryProps) {
    super(props)

    const o = props.order

    if (o) {
      this.state = {
        id: o.id,
        clientName: o.clientName,
        date: toDateTime(new Date(o.date)),
        value: o.value,
        productId: o.productId,
        paymentMethodId: o.paymentMethodId,
        services: new Set(o.services.map(v => v.id)),
        changed: false,
      } as Readonly<EntryState>
    } else {
      this.state = getInitialState(props.constraints)
    }
  }

  /**
   * Handler de alterações do campo nome.
   */
  handleNameChange = (ev: React.FormEvent<HTMLInputElement>) => {
    this.setState({clientName: ev.currentTarget.value, changed: true})
  }

  /**
   * Handler para limpar espaços em branco do input.
   */
  handleBlur = (ev: React.FormEvent<HTMLInputElement>) => {
    this.setState({clientName: ev.currentTarget.value.trim()})
  }

  /**
   * Handler de alterações do campo data.
   */
  handleDateChange = (ev: React.FormEvent<HTMLInputElement>) => {
    this.setState({date: ev.currentTarget.value, changed: true})
  }

  /**
   * Handler de alterações do campo nome do produto.
   */
  handleProductChange = (ev: React.FormEvent<HTMLSelectElement>) => {
    this.setState({productId: ev.currentTarget.value, changed: true})
  }

  /**
   * Handler de alterações do campo valor.
   */
  handleValueChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const n = Math.floor(ev.currentTarget.valueAsNumber * 100) / 100
    this.setState({value: n, changed: true})
  }

  /**
   * Handler de alterações do campo método de pagamento.
   */
  handlePaymentMethodChange = (ev: React.FormEvent<HTMLInputElement>) => {
    this.setState({paymentMethodId: ev.currentTarget.value, changed: true})
  }

  /**
   * Handler de alterações do campo serviços prestados.
   */
  handleServiceChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const target = ev.currentTarget
    const services = this.state.services

    if (target.checked) {
      this.setState({services: services.add(target.value), changed: true})
    } else {
      services.delete(target.value)
      this.setState({services: services, changed: true})
    }
  }

  /**
   * Handler do botão de criar entrada.
   */
  handleCreate = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    // TODO: uma reação ao resultado da operação deveria ser adicionada aqui
    fetch('/api/order/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: this.toJSON(),
    })

    this.setState(getInitialState(this.props.constraints))

    if (this.props.onSubmit) {
      this.props.onSubmit()
    }
  }

  /**
   * Handler do botão de atualizar entrada.
   */
  handleUpdate = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    fetch(`/api/order/update/${this.state.id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: this.toJSON(),
    })

    if (this.props.onSubmit) {
      this.props.onSubmit()
    }
  }

  /**
   * Handler do botão de remover entrada.
   */
  handleDelete = (ev: React.FormEvent<HTMLButtonElement>) => {
    ev.preventDefault()

    fetch(`/api/order/remove/${this.state.id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if (this.props.onSubmit) {
      this.props.onSubmit()
    }
  }

  /**
   * Retorna `true` quando esta é uma entrada que já existe.
   */
  private isEditing() {
    return this.state.id != null
  }

  /**
   * Converte o estado deste componente em `JSON` para ser enviado ao servidor.
   */
  private toJSON() {
    const s = this.state

    return JSON.stringify({
      clientName: s.clientName,
      date: new Date(s.date).toUTCString(),
      value: s.value,
      productId: s.productId,
      paymentMethodId: s.paymentMethodId,
      services: Array.from(s.services),
    })
  }

  /**
   * Converte o estado deste componente em `JSON` para ser enviado ao servidor.
   */
  render() {
    const isEditing = this.isEditing()
    const legend = isEditing ? '' : 'Inserir Entrada'
    const onSubmit = isEditing ? this.handleUpdate : this.handleCreate

    return (
      <form
        onSubmit={onSubmit}
        method="post"
        className="pure-form pure-form-stacked"
      >
        <fieldset>
          <legend>{legend}</legend>
          <div className="pure-g">
            {this.renderName()}
            {this.renderDate()}
            {this.renderProducts()}
            {this.renderValue()}
            {this.renderPaymentMethod()}
            {this.renderService()}
            <div className="pure-u-1-24">{this.renderButtons()}</div>
          </div>
        </fieldset>
      </form>
    )
  }

  private renderName() {
    return (
      <div className="pure-u-4-24">
        <label>Nome:</label>
        <input
          name="clientName"
          type="text"
          value={this.state.clientName}
          onChange={this.handleNameChange}
          onBlur={this.handleBlur}
          required={true}
        />
      </div>
    )
  }

  private renderDate() {
    return (
      <div className="pure-u-4-24">
        <label>Data:</label>
        <input
          name="time"
          type="datetime-local"
          value={this.state.date}
          onChange={this.handleDateChange}
          required={true}
        />
      </div>
    )
  }

  private renderProducts() {
    const options = this.props.constraints.products.map(a => (
      <option value={a.id} key={a.id}>
        {a.name}
      </option>
    ))

    return (
      <div className="pure-u-3-24">
        <label>Eletrodoméstico:</label>
        <select
          name="productId"
          value={this.state.productId}
          onChange={this.handleProductChange}
        >
          {options}
        </select>
      </div>
    )
  }

  private renderValue() {
    return (
      <div className="pure-u-4-24">
        <label>Valor:</label>
        <input
          name="value"
          type="number"
          value={this.state.value}
          onChange={this.handleValueChange}
          step="0.01"
          min="0"
          required={true}
        />
      </div>
    )
  }

  private renderPaymentMethod() {
    const options = this.props.constraints.paymentMethods.map(pm => (
      <label key={pm.id} className="pure-radio">
        <input
          name="paymentMethodId"
          type="radio"
          value={pm.id}
          onChange={this.handlePaymentMethodChange}
          required={true}
          checked={pm.id == this.state.paymentMethodId}
        />
        {pm.name}
      </label>
    ))

    return (
      <div className="pure-u-4-24">
        <label>Método de Pagamento:</label>
        {options}
      </div>
    )
  }

  private renderService() {
    const options = this.props.constraints.services.map(v => (
      <label key={v.id} className="pure-checkbox">
        <input
          name="services"
          type="checkbox"
          value={v.id}
          onChange={this.handleServiceChange}
          checked={this.state.services.has(v.id)}
        />
        {v.name}
      </label>
    ))

    return (
      <div className="pure-u-3-24">
        <label>Serviços:</label>
        {options}
      </div>
    )
  }

  /**
   * Botões de ação para inserir, modificar ou excluir itens do banco.
   */
  private renderButtons() {
    if (this.isEditing()) {
      return (
        <>
          <button
            type="submit"
            value="save"
            className="pure-button pure-button-primary"
            disabled={!this.state.changed}
          >
            Modificar
          </button>
          <button
            value="delete"
            onClick={this.handleDelete}
            className="pure-button"
          >
            Excluir
          </button>
        </>
      )
    } else {
      return (
        <button type="submit" className="pure-button pure-button-primary">
          Inserir
        </button>
      )
    }
  }
}
