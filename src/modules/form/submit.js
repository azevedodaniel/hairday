import dayjs from 'dayjs'

import { scheduleNew } from '../../services/schedule-new.js'
import { schedulesDays } from '../schedules/load.js'

const form = document.querySelector('form')
const clientName = document.getElementById('client')
const selectedDate = document.getElementById('date')

// Date atual para formatar o input
const inputToday = dayjs(new Date()).format('YYYY-MM-DD')

// Carrega a data atual e definite a data minima como a data atual
selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  // Impede o envio do formulário
  event.preventDefault()

  try {
    // Recuperando o nome do cliente
    const name = clientName.value.trim()

     if(!name){
      return alert('Por favor, informe o nome do cliente.')
    }

    // Recupera o horario selecionado
    const hourSelected = document.querySelector('.hour-selected')
    
    // Recupera o horario selecionado
    if(!hourSelected){
      return alert('Por favor, selecione um horário.')
    }

    // Recupera somente a hora
    const [hour] = hourSelected.innerText.split(':')
    
    // Inserir a hora na data
    const when = dayjs(selectedDate.value).add(hour, 'hour')
    
    // Gera um ID
    const id = new Date().getTime()

    // Faz o agendamento
    await scheduleNew({
      id,
      name,
      when
    })

    // Recarrega os agendamentos
    await schedulesDays()

    // Limpa o input do nome do cliente
    clientName.value = ''

  } catch (error) {
    alert('Não foi possível realizar o agendamento.')
    console.error(error)
  }
}