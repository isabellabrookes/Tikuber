const averageTicketPrice = (eventsTickets) => {
  if (eventsTickets) {
    return (eventsTickets.reduce((total, eventTicket) => total + parseFloat(eventTicket.price), 0) / eventsTickets.length).toFixed(2)
  }
}

const calculateRiskFactor = (ticket, tickets, eventsTickets) => {
  let risk = 0
  risk = calculateRiskOfOnlyTicket(risk, ticket, tickets)
  risk = calculateRiskOfPrice(risk, ticket, eventsTickets)
  risk = calculateRiskBusinessHours(risk, ticket)
  risk = calculateRiskNumberComments(risk, ticket)
  risk = Math.round(risk)
  risk = Math.min(risk, 98)
  risk = Math.max(risk, 2)
  if (risk < 41) return {riskFactor: risk, riskClass: 'low'}
  if (risk > 79) return {riskFactor: risk, riskClass: 'high'}
  return {riskFactor: risk, riskClass: 'medium'}
}

const calculateRiskOfOnlyTicket = (risk, ticket, tickets) => {
  const ticketsCurrentSellerHas = Object.values(tickets).filter(singleTicket => singleTicket.sellerUser.id === ticket.sellerUser.id)
  if (ticketsCurrentSellerHas.length === 1) return risk + 4
  return risk
}

const calculateRiskOfPrice = (risk, ticket, eventsTickets) => {
  const averagePrice = averageTicketPrice(eventsTickets)
  if (ticket.price > averagePrice) {
    const percentDifference = averagePrice/ticket.price * 100
    if (percentDifference < 15) return risk - percentDifference
    return risk - 15
  } else if (ticket.price < averagePrice){
    return risk + 100 - (ticket.price/averagePrice * 100)
  } else return risk
}

const calculateRiskBusinessHours = (risk, ticket) => {
  const date = new Date(ticket.createdAt)
  const hours = date.getHours()
  const mins = (date.getMinutes().toString().length === 1 ) ? '0'+date.getMinutes().toString() :date.getMinutes()
  const time = parseInt(`${hours}${mins}`, 10)
  if (time >= 900 && hours <= 1700) return risk - 13
  return risk + 13
}

const calculateRiskNumberComments = (risk, ticket) => {
  if (ticket.comments.length > 3) return risk + 6
  return risk
}

export {averageTicketPrice, calculateRiskFactor}
