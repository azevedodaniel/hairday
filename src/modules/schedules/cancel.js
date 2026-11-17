import { schedulesDays } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js" 

const periods = document.querySelectorAll('.period')

// Gera evento click para cada lista (manha, tarde, noite)
periods.forEach((period) => {
  // Captura o evento de click na lista
  period.addEventListener('click', async (event) => {
    if (event.target.classList.contains('cancel-icon')) {
      // Obter a li pai do elemento clicado
      const item = event.target.closest('li')

      // Pega o id do agendamento para remover
      const { id } = item.dataset

      // Confirma que o id foi selecionado
      if (id) {
        // Confirmação do cancelamento
        const isConfirm = confirm('Tem certeza que deseja cancelar o agendamento?')

        if (isConfirm) {
          // Chama a função para cancelar o agendamento
          await scheduleCancel({ id })

          // Atualiza a lista de agendamentos
          schedulesDays() 
        }
      }
    }
  })
})