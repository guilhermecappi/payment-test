import { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';

function App() {
  //https://teste-rgoyjiyqkq-rj.a.run.app/

  const idToken = localStorage.getItem('idToken')
    const [stripe, setStripe] = useState({});
    const [scheduleCode, setScheduleCode] = useState(null)

    //Pegar config do stripe na API
    
    useEffect(() => {
        async function fetchConfig() {
          const { publicKey, unitAmount, currency } = await fetch(
            'https://teste-rgoyjiyqkq-rj.a.run.app/payment/config'
          ).then(res => res.json());

          setStripe(await loadStripe(publicKey))
        }
        
        fetchConfig();
    }, []);

    //Enviar agendamento pra API e pegar Codigo da Sessao 

    async function payItem(){
        const item = {
            date: "04-06-2021",
            hour: "14:00",
            local: {
              alias: "Casa nova",
              city: "São Paulo",
              country: "Brasil",
              locality: "José Tomás de Souza",
              number: "205",
              postal_code: "05177-210",
              region: "São Paulo",
              region_code: "SP",
              street: "Rua Nossa Senhora das Neves"
            },
            service: {
              image: "/images/services/E.png",
              model: "sedan",
              title: "Enceramento",
              uid: "E"
            },
            payment: ""
        }

        let request = {
          method: 'POST',
          headers: {
              'Authorization': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZHJ5YXJ0LWJhY2tlbmQtMzA3MDEyIiwiYXVkIjoiZHJ5YXJ0LWJhY2tlbmQtMzA3MDEyIiwiYXV0aF90aW1lIjoxNjIyODA2MzA2LCJ1c2VyX2lkIjoiN2tuQ3g1ckRCMk1xR1A1VVlKRlJYbXRHMFpBMyIsInN1YiI6IjdrbkN4NXJEQjJNcUdQNVVZSkZSWG10RzBaQTMiLCJpYXQiOjE2MjI4MDYzMDYsImV4cCI6MTYyMjgwOTkwNiwiZW1haWwiOiJndWlsaGVybWVnY2FwcGlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZ3VpbGhlcm1lZ2NhcHBpQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.bj3E13gtYhf2T0_DstGEOIxMCI3X86QMqhsedSOOCvPCLKdm2bX4JNDrrLGrF4US2W9tjS1YMEBubQhJQGRzYNeBlPOz7HMKcpwVYYEYT1uP2d0StvaC0Wa3i8bEyhRCZxefD0veZEf1hk-EJHA5xSj6X0pMZIjZqwqijTzt-serrc773ZDuNl9ksm_ULAfuzxhnxJ-_u056qCoRMwV8ZGWT3XVnvbvb5FPmx-qhYw7At-WTZ14-WMqHqcTD76rqFOkW0A9ibpAxlhyjoWpos6HQ54FOD4ZlqZAUC50vRB56pD4AgmVPUedkFIJ3r7HRtFqIgySqC5kT8ypI0Iw9jA'
          },
          body: JSON.stringify(item)
        }
        await fetch('https://teste-rgoyjiyqkq-rj.a.run.app/schedule/', request)
        .then(res => res.json())
        .then(code => {
            setScheduleCode(code.name)
        })
        .catch(console.log)
    }

    async function createCheckOutSession(){
        let request = {
            method: 'POST',
            headers: {
                'Authorization': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZHJ5YXJ0LWJhY2tlbmQtMzA3MDEyIiwiYXVkIjoiZHJ5YXJ0LWJhY2tlbmQtMzA3MDEyIiwiYXV0aF90aW1lIjoxNjIyODA2MzA2LCJ1c2VyX2lkIjoiN2tuQ3g1ckRCMk1xR1A1VVlKRlJYbXRHMFpBMyIsInN1YiI6IjdrbkN4NXJEQjJNcUdQNVVZSkZSWG10RzBaQTMiLCJpYXQiOjE2MjI4MDYzMDYsImV4cCI6MTYyMjgwOTkwNiwiZW1haWwiOiJndWlsaGVybWVnY2FwcGlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZ3VpbGhlcm1lZ2NhcHBpQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.bj3E13gtYhf2T0_DstGEOIxMCI3X86QMqhsedSOOCvPCLKdm2bX4JNDrrLGrF4US2W9tjS1YMEBubQhJQGRzYNeBlPOz7HMKcpwVYYEYT1uP2d0StvaC0Wa3i8bEyhRCZxefD0veZEf1hk-EJHA5xSj6X0pMZIjZqwqijTzt-serrc773ZDuNl9ksm_ULAfuzxhnxJ-_u056qCoRMwV8ZGWT3XVnvbvb5FPmx-qhYw7At-WTZ14-WMqHqcTD76rqFOkW0A9ibpAxlhyjoWpos6HQ54FOD4ZlqZAUC50vRB56pD4AgmVPUedkFIJ3r7HRtFqIgySqC5kT8ypI0Iw9jA'
            }
        }

        return await fetch(`https://teste-rgoyjiyqkq-rj.a.run.app/payment/create-checkout-session/-MbLnXqXwsAYeMJZ10Lv`, request)
        .then(res => res.json())
        .then(data => console.log(data))
    }

    async function goToCheckOut(){
        const { sessionId } = await createCheckOutSession();

        await stripe.redirectToCheckout({
            sessionId
        })
    }

    
    return(
        <div>
            <p>Faça o pagamento abaixo:</p>
            <button onClick={payItem}>Gerar código</button>
            <button onClick={goToCheckOut}>Pagar</button>

            <div>
                <h3>schedule code</h3>
                {
                    JSON.stringify(scheduleCode)
                }
                {/* <h3>id token</h3>
                {
                    JSON.stringify(idToken)
                } */}
                <h3>stripe</h3>
                {
                    JSON.stringify(stripe)
                }
            </div>
        </div>
    )
}

export default App;
