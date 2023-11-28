# Softest

## Historias de usuario para evaluadores
| Historia | Recurso | Método|  OK? |
|-----------|-----------|-----------|-----------|
|Como evaluador quiero visualizar mis evaluaciones planificadas para ocultarlas, editarlas, borrarlas o iniciarlas. | /evaluation    | GET | NO |
|Como evaluador quiero planificar una evaluación seleccionando entre los test y cursos disponibles, para ser ejecutada en determinado día y hora. | /evaluation    | POST| NO |
|Como evaluador quiero modificar una evaluación que ya fue planificada pero no ejecutada. | /evaluation    | PUT| NO |
|Como evaluador quiero borrar una evaluación que no será ejecutada o que no me importa guardar aún si ya fue ejecutada. | /evaluation    | DELETE | NO |


### Auxiliares
| Historia | Recurso | Método|  OK? |
|-----------|-----------|-----------|-----------|
|Como evaluador quiero visualizar la lista de tests disponibles para decidir cual agregar a mi evaluación. | /tests    | GET | NO |


## Historias de usuario para administrador
| Historia | Recurso | Método|  OK? |
|-----------|-----------|-----------|-----------|
|Como administrador quiero visualizar la lista de cursos. | /evaluation    | GET | NO |