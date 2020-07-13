

 <h2 align="center">:ice_cube: CubosDesafio</h2>
 
</br>

## Exemplos de Requisições:

#### Criando regra de atendimento especifica:
        // METODO POST
        http://localhost:3333/appointment
        {
        "day": "2020-04-06",
        "intervals": 
            [
                {
                    "start": "11:10",
                    "end": "12:00"
                },
            {
                "start": "08:00",
                "end": "09:05"
            }
            ]
        }
        
#### Criando regra de atendimento diária:
    // METODO POST
    http://localhost:3333/appointment/daily
    
    {
        "duration": ["11-07-2020", "18-07-2020"],
        "daily": [
            {
                "segunda": {
                    "start": "13:00",
                    "end": "14:00"
                },
                "terca": {
                    "start": "13:00",
                    "end": "14:00"
                },
                "quarta": {
                    "start": "13:00",
                    "end": "14:00"
                },
                "quinta": {
                    "start": "13:00",
                    "end": "14:00"
                },
                "sexta": {
                    "start": "13:00",
                    "end": "14:00"
                },
                "sabado": {
                    "start": "13:00",
                    "end": "14:00"
                }
            }
        ]
    }
    
#### Criando regra semanal:
    // METODO POST
    http://localhost:3333/appointment/daily

	 {
        "duration": ["12-04-2020", "13-04-2020"],
        "weekly": [
     {
        "terca": {
                "start": "15:00",
                "end": "16:20"
            },
        "quarta": {
                "start": "15:00",
                "end": "16:20"
            }
           }
        ]
     }	
    
#### Deletando uma regra de atendimento
    // METODO POST
    http://localhost:3333/appointment/specificDay
    
    OR
    http://localhost:3333/appointment/daily
    http://localhost:3333/appointment/weekly
    
### Listando atendimentos por data
    // METODO GET
    http://localhost:3333/schedule
    request.query = date

### Listando todos os atendimentos registrados
    // METODO GET
    http://localhost:3333/appointments
    

    
### :rocket: Technologies

#### This project was developed with the following technologies:

- [TypeScript](https://github.com/Microsoft/TypeScript)
- [Express](https://github.com/expressjs/express)
- [Eslint](https://github.com/eslint/eslint)

### :hammer: Tools
- [Visual Studio Code](https://code.visualstudio.com)
- [Insomnia](https://insomnia.rest)
</br>


With ♥ by [Vitor Queiroz](https://www.linkedin.com/in/vitor-queiroz-4b32131a3/)!
