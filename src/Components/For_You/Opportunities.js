import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Opportunities.css';
import backnavhead from "../../Assets/back navhead.jpg";

const BASE_URL = 'https://admin.fidni.tn';


export const volunteerOpportunities = [
    {
        id: 1,
        title: 'Bénévole pour des événements accessibles',
        organization: 'Organisation Internationale du Travail (OIT) Tunisie',
        description: "L'OIT travaille sur divers projets pour améliorer les opportunités d'emploi pour les personnes handicapées en Tunisie. Ils se concentrent sur la création de marchés du travail inclusifs et proposent des programmes de formation pour améliorer les compétences et l'employabilité. Plus de détails sont disponibles sur leur site officiel.",
        imageUrl: 'data:image/jpeg;base64,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'  // Placeholder image URL
    },
    {
        id: 2,
        title: 'Soutenir les initiatives d\'accessibilité',
        organization: 'Agence Tunisienne de la Formation Professionnelle (ATFP)',
        description: "Cette agence propose des programmes de formation professionnelle spécialement adaptés aux personnes handicapées, les aidant à acquérir des compétences qui peuvent mener à un emploi durable. Vous pouvez explorer leurs offres sur le site de l'ATFP.",
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABJlBMVEX///8BOmUlravrH1T/yjD8/////v////0AOGQlrK8lrarqH1QAN2QmrKwALV76//8ANGIAO2QAK10AKFsAMWDqAEgAJVgAK14AK1oAMGL+yirsFE/oAET8//oPqKkAJ1z7+unN6ejsws1RbIWLnKm7x86otb96j5/q9/ZAXXgAIViWqbRcdIm+4uKwvcX27fBqvLv889X23YBTt7UjSGrwzdj51Wp7xMTw1tv30l3jc47i8/P57sP5zk2Vzs3W3+LpXXznmaxwg5XO19wwUnAAMlel2NUSQWXo7O7g8vBKZntAW3veLFnkpLV/lqLfZoPiRmr24pj35ezjfZL36LDosr/6xQv535D3zDncKFbmp7X40WLst8HiADflTnD14ZTkip0ADFCVb4C0AAAXxUlEQVR4nO1dCVviSLeOaKUIEIolIG0gggLigoCg2C7Qgo3Q7bS22zh+fo73//+JWxW2LFVZgLZn7s379Ew/rRDy5uynThUc58GDBw8ePHjw4MGDBw8ePHjw4MGDBw8ePHjw4MGDBw8ePHj4fw2o/vm/jkyp3y0U853O3qaKvU4nXyx0+yX0u+9sPqiiA/3Cbme7ISXj4bAUwQiFIqGIJEmr8WSksd3ZLfQBee2/VM7tYucyGsfMQv4lCvz+iBSORS87xf7vuDvIc6g02ztVgaDC1lU4jLlFozR2U2CJroavtgpEY+FH2iyEufopP9NbAdcvdL7GJbrkqNIMSXGpUyh9HD/8SaWm0uTcM8TyA92tq/XIkp3sjIhK8atOF32MSUIe9QQhkJvlvaXi9rrkWHgGUUqp7eJspuEWuboS8NVn8OWlH9FYZHrHfj9WQEyXiNMR66g/tbT1y/0OPK0qgiAqPdfv7G8lP02I+CM4KIRXUwSxcPgTdjrOSEo7nfZcBICNcWEFDYgYgiu7h4SfJI24SavrS43vm1v5YrG4j1Es5rc2ty+v4vFPET8WlCXD6NKnVKc/RypUqVj8kufKREExsJ9xhVI+miJ3Hgknrza39ikJC0D97n5+r7ETk0I2cvRLS/nZ7RFu8ID6C57nuQFWUFFUGQ6cP0N8vf3LVXxjn9Yje8U2Gr5TdYoTheFHsQ6i9n7nakcKWbla/KjCV0VuRjmCw0cGQ1hqKT5B8Kmou7gk7H+LhfxS7GoLe3sndwXa+ctU2NouQ6vb7dkYQu6GpqeAQ2WfIgZ8qgQDStnpxXEA3E1FIrHGVtfxLZBrt3cvw9KShSSjkWSen43j6w2gSBF7UN8EAcF5qGh/i0upvX33dgO6nStLk/THvjt+ajrw1xsUhiVRmDJUWsZfQ4joj7MYiUdmcu/kcv3dRtzKIiPSLjdDZoX+CJr1lIdlRZzK8NT4+9MqNXqgzk7qR3/2TAuiYiNuYY/+2F7JPUWel6l6Wh3zE4Wq4deohaMHhUb7KvljjjQLQqByDFtYo3TVnSFXvfjvi5khHIyFKATKut+gsqgotCx1n4Tm+TNllL/6ZKGpqaL7S1aCwWMKxdbI14ialBQLGwdJ0WeUKiGWv2Q5Ah4CgEAmm83WarVsFpKQyRQE/kW/k/KzzTGeB66f43v6lvIWVDf7GYhaOEnF0cP86k4eMD8XZs9+Hp2fP6+sra08n38++HmWtbrHDNdtrDMpRlc7bqsAcBdM3FMsceRslIlTgQArKBaqTzRZW/8H3YFieaHsw9EaxsoK/oOxpv7j6CELGHIkPwVbKWbkiMa+IbdSfE/Ij+YP4psBnJQGxikpT8oowjngM0YP2N+nZ0ZYHrWDtachtZUpwbW1p6eVgzPWmwgKDYntby7dOrS7oEwzxVPMR1RywwwS1/mjHC6gDAwvRIwICGHtaE1DD3N9Pvrz4QybY+3s4c+jv2sZ9k3195LMMvLTtsuyEWAh3lKyt14gII5S0kwvoIwYilUzE/p1swcrOumd/6xlM8MnCXgewGwty7wnfM08MzZGI24pVoLLiROzEJE4Kn0hmGRxAZqfoTDMQHD2rJXf2tEZVO8cav6yRiESYVDEUnTpbi7SwfS7+cZzytiplMcMsZ9BDtIKCLMHTytrU34HWc595txuMEOjW4r8tSynN4y5DeSaYz8DquMMwFFDA3LZ/6xpCH6uzVbe9beZ/ia8h1xkNxC9JJYp3oY/HTsVfjCshXES58CP8aB2vqZR0J+Z2ZqtuATYZFJM/XB1Jf5NXibehn0nrZGaNm0fHK48slqCKw+ubkUPtBdmBX+cwLnJUTcSy0H5zeJRj3IcakpqAMh+1hB8rs2TrEK0x5JiKFxwo/rgRsYO9Yb0Z6jgidtRs1R7hcscaJzos2VgdwC0ucqg6I+6iBkQ527y8nLinUkAux3FoZ950EaJs3nrDYi2WUEjsu3q6V0kljHFC8DovnHcgCRx9n4GZp+nJvj0c04JEvQbLIqreRfPD1b+wkJclhnNN/KKniI6aZxqdHTtKLOAtRXY/srKbrApOgZAG2lMUU680kp+FahuSkkpqD1pUrWa8xuwQkFidBv9DefdeB6Bk0QQU5Q3mK/J1R0ohVaEB04/3Q67cZY/7bhRkru/lgnkQ4YQITD1pMzIarLRtQWJkEPcHsMU/SknejqqziH3klApBlkUHQA+TJV07fMirHCI/hXDFP0NRmdTi9w4ieW/yKoQg4cz30nmPxoR/lzgUnyXoadR7E9tcTqph+7k5TkpZrUV4aKUlCMLDXlW4E85aEE3S+PLjPRUnllRz7QJaXa2a9BR+h6hK6q0Z/dWHpZbo9UuyN/Iy0GVItujWuKnNmGzaFK4B+wyulOhlO2CBkTiZIHwLhgMDqW4YbdATMWfGhmeL3iSosOohyOb9o+yVR93O8HrUE9xAveCZlgIOdIydM3BErAUZrQY4/YR41TpTZ73vTym+Adya4wQHv1CGXK7SbolRrbthMijaqA0FlfldkLx3TVD7mjlV9khsaZLuhCjO3ZCJKtp4+UkHhynxxTlE95tB13LcP5oYXzC+4wGY2Tb/lL1cZMQF08v6eWxFL9YDWvQoM1K1x7mjvh3+n9CVqm407b9pJ4yKf0AOBkLcVm+vXOQFGmgjRZrB7M2oMaoGFcbCimGO+3YXqskCpMVCjQ1xSAJjOxVJTPOtAyfs3NSfHnV/xvX+wx3+tW+odFUNCMXx8OgOAyMF278zbTAVxPTuSp8Ht2assciY4k4smt7uYEiaFqhrxNTxDXxvQtJZI70QnRmifRpWbDx3zvjCxFjUDXkoAdeFYXqxHWCi8SE4nLi9s6pLKCuDYUt0aEVU9UZfUkbHR3k8vTmot8+deNyAumkjWtFdKOhKAdfnVLktc1gTPHBfk0acqBGWWeD3IYcNH0s7CfpHeJPW3YfxHN1nyjkJs+y8iYvazi+Q2ccIfe3juFzzTa9hfDsIENJDsCb/EbpGW3SA0bIthLmuZwiBurTl91daykm3owmwbhdLqtliFO3GrBKbbAFgofnGu35P6blE4ob36eXwtGkg5GpuqiZs8S5TVBDMZgIPjrLb7R9DJXimWW0QZm/nx5o+sEH5QTNjfcZI6nSlv295RQfWRIdaRUgaxlaRU2cVDhW018LnTslhTBZeuJpLPHFQO3z0wHVAO4TywlKkQpZTalQw9aOAKiKYkDMje8FoEctxeBy4tq0xEiF3tmQ5V/Ggj3I1I7Wno5ovwTk8SaOaQwZaoozN7sbUy1R9NXHPVZAYoZWUUlodJKn8rr1bVWMB5gjhBk4VAGyxg0ByJ4dYfqfs+anxiPsBYLL15RPg1hN6d40bB/0cUxUAqIwbfvy6D29rEOCOspovD/+bE1PkRD5WctM3woy2YeDZ/wqQpCiwDxZCpNv6Nf/xigwbPs13NASA9PdI1iK94mgjqKcPqkAm9IfQnS2YqBIZk2ePx88PJydnT08/Hn0vPZEnsLTQcY8OcTjJztcJqJfnxX0I/aTRDxskkVCzRIaj04SywYx/sVevBlT1C9zayS59oQxHItaGa5/U24KoBe1RE0weppdRm4qOWgrwlPF5wuIYm48WICd4I2Ropz4coxMxan+OjgsHhg1VWuXQ37nZ5R1alygbsiq+dPMkKDEGCVyNrfYUrcfCNM1JsSbpLgsy/cVW6+Kzs6fmByHAqTn5WBjaBjyDSuQMpoZkn2RiFESfISjqFm0MkuRZKp/8MA6A4Bc5uGcJUespgc1WsoKeDCSYDDxB4vhFt0QQ/a9DEKnp24iUTTr9TQpEq/6aBP9cUadfSDxgELv/GeNoQTocVJ9MyoayBVjdFfTcLSuj+rqFLvS1MRh7G5kA0ESHN82kKWukugHMcnz0UDiaDBx5fOfZ4xUlQfgYhyf5DfWZbnuOsOZOhqihzlFME7OAvBOkSJxOQ6iI5fJ1nB4+HyO8fmIjM9mOMgSf2WqLokX5hVLO3RX46AzTBjCpjAcstSOkeLQb5SiKkeZyNHJZUlGk7FbTgTHt9NPMVW/GjDWEh1lNWQ/UEAcDiFqKPLjVSmTHNO3j5UFzFsQgBd5SpDtSTE2Gc7UQXmhoqcIhKOgH555NQtxZI/XFzh2zMkSF9jHXxLyNIFKWxlAh15eOMrb1A+rqhueAtqNlbhSP7ymciT2GLw/nLeDX3kP6poKt1ae+gc9XEQ2nT7nwWjXmn6vBbaSxHKQQVJ+e6lwMwsSgJdrWXftBGUTyBS7jIB46bh93Rr6U0HQDgQjrkKJ/RNtTQdvNtyuAYxQebk2JPg4Y7OS4T699Y0DokOGPKoL4x0zOlsExmpKb5Hp4P1GBdnkrDpg+0V3F3+ZHlyaUVaMwAiIS45H+QDpD/tGUuzpfvEYZBjjUFkT6eubR8fdVXzByutNkKIY19b+mcEwKrkYVuyNB7sNUuRwyGLYoipH1e+8vb/eAWDtX4mk715PrhMyxbatrZDj2kk6QydjGSNAvi6O91ca9h9WbtiaOuIpY7d/e/JybGWWd6/vt0FZpmqEfGt6OdANRbZ36AzjbvY+noqTHYiGrdzoxVJTx3eJNTb915f7l43juwqPE06EwfN85e5444/7L8F0wpTrTp5Q+tAk/lPdbDKLYdLV7s7JBoQApqjZtMwjNWw4AMnq5AQmGry+fftC8HZ7TagxuQ2RuDf3yXuLZwgzzeleYKWqUxJQuU+zIiNLoiM4ee2tyc0ArmpgSJ/GdGGHajupPt0pq9Q1Y4m4SgUbrARnfshmHeVKim4ssru+AIZq00Yc78jHKVxOH+YqJ5RqYxGgdth6ik6JCnFqa98fdskQm+KEoRjAGZw2YQAIi/EXcKRtwCLTyTqG+yk6w4jro1Cagami4ppYn/Whyr2Ny5gB9D0fOUXUNYUYean/yjXDSfY2LDV0m9R5nkOHbzgXd+Vy7AjSkhnIVRWf7ic/6BNuUddbL3EYmpyNoQb/uvEIEP4l7ShwOCZ4R0tqB/iTdT/oMGT4fYbiZtS1mWhqmdOusGGHW7kn1rgQOQYZBMmciH671Td6je/fdE9Qk6AO/Q0O/ob1bnB8k7BIVV0gcUtfZx4ovoA+c2Tsv3AwN2QCz8FhF3xMUY2M+lY8Do5fqPmzW4L0ETMc7QVfQHe8Sp+e0ixJDka+KR+Q0Z5zolYbpm2yCGy8zRsdg+n7Cn2ooRwQyJa5CUVmv3QpPMOBCySBQXWfVoy42MBpqvFeMMfEPPYoyy/URTvAIVEQNacCWPS8HfZLzYCndZ23wRxF85k8ABzeyDP71fQbZbv88NNbAvlETSIHWesWzkt8A3g4EH0GKK2SYVmFJKvH79ez5ABBOXjBs1Zdh85cu0MecozxvVBj5hNCYU4wclTqOco9ocojdjruSJKd8nfMdaySmhrri/ASY94kMlOwGDJUi0VRy3JYNBrXN8kRM3fv12k56DR+yHL67dDi4LgqGZ4w7M1lDZnO5krHt17W1Bljn+or02wHIaKtQWeloBy8ObZa+BidIaM/a4Sxjh+NzehoVACuZyRIVjaqA7OqkpQH8McXX64TRGGZsiT18O1FxTzMrUF5dNxYVfMpkLVqEU3NecjicOnUIEbiceiPBIHK4cXNNWlZmMVJmjjBLxfHzB25I4KjlBFnNJpMkTX25b+ajyDEFMkRinox+hSiqtSJruExe3cbFydvwXSadGdGSKeDtyd/HJKmtnXDsSyOArGS034CaybK2TK+JcdeQDCpqi9AvKoVAEJ85e7w9eWC4OVx47jCI5sZABXlSdKvP1t0j3Ekamx/LnrcUIo+wSRFUjfmLPYPQUixNAfD8dOUX38ALktJl5Lzn3UKSYpolqIPe9nmTGfUWgC1FGFs9/pYwVJSB7tK7IEpCuT8FiPDAE4csVtd1Km/WOSlamD6MeK0e4I/gjEjPF80nIInZ0eYcjjiVQWhuig58lxO0CRR+tqwT1+yWIruzHg6pgGQG1DUVJUjyeTK5qJjBmANFactMDFwqq0r8qwNF25PHWIB4kqDEhiH94I59uY/vrlc1xza6CNHVWk8FbpibJoJL0ZJOfXUr6pCFePQK4jNHLDMU2yuPjAW3PpzqfYZpaHDaSFnNwFRU6HTI3IUcYDsOTiZgI7Tpk8xmHld16VlbV6LbC50OyfssSmS4KEEVG2FwMng++iSOEKCAX50Bn6i/gBcVlkRjc8d7nV3A7kczZ+OIeBIJmBJDlzZfklvf2OGOhGiTYk+4x29WvDXY/DcoB5gG+NQXRWl3iqfOhgLV+mRMwzFgLmZUNa+sBBj5DOOp6EcM+RhycIYxyRx0ipiljayLOV6Vfw46FpRB5oeG3P34dKO0zETNwCj4TBrkDCJk4FWL0f5mhVQGvRa1eHMLjUCCbqqAu6vM0TodNzLLQZ1WzGqosRmqRAI9Wqz1er1yuVyr9VqVuvqT33UHGkIfc6NvrK+JSNpvw14NjjQ1CHHIQeStgvKEIHROwMim58oaDJS9tbDXydCspep7IjhGMIEzh6MrqiAbcbJH9jPzHbStzNYJjhzQt9DhKyiImp/uMk8gKD3qxgqVV02s8vI17CSLi5ho4McUW/vVF1DqGuTeNhlHhH5yd0RkTMA8uoJyosFrkJ1yS26ZJ1KF1r6FbHQCOxUF6yrAUE73QK4DvOo9uRMS2ruQQ6KZpSNMwAXKDldt6rIaM443SizEJQFxWkYcEBRFydgN8wIFNGokw1rCwGuk0otnKAtRpCirgXMtRusfJScZbaAvoljDFrKIlyOUtcezwi5EvN4z6XItwXt9XAGbDinTSUgzCNGrAPqIKQmW0Ob7C9L+OWhkILTZsBxWkaDYDwEFuyxv/FifaGVvTOQbm4roAiz5QABkWjodGQBWzfoMBoX2AjDHfYescXxoaHUq8/kV0VF7OmqSJ6DHWayRo74+uWxvs9aDEG5JnY6AXcWqSjNU0PfGlmoaOTqV1WFGsBul9lKHwnSsbYqinFZAED0jUnQH3V0cum8gNw+60xtsvZ52quL6jqHRZmr1scitsCmucnavmR6UUzwg7I1Lr9rFZHAgHSZpi00s3ESKStCtWxaDYBc4YoZB/3+5MK6+LbY6tgsx5Bemk9tyIx6FtO1cpH8XKyWqQcw70YsvsNrfdHtQwugzmXfLnMCpUG5Neo8DdtPw7/EerM3oK/llDrMZBuLcL3zoblMZ8cm8A6XTiFAp7lyr9dS0SuXB6MGo9GQSYe/22B/gal/afVjCWKK/9NZaBUKM/kU0wQ/XoLqsODOldP8ichTPZ+G+Z1WHNfdttDQ6Ifa4Bggn0rtLSoJ7m9FLL5iN7oU/zgvqkVxR4r8yMz2XSuGK0WlJfY3Wkb964423f8CFCKR8Nfdede4UKHBOC9hhIj0EZkMDQAnIKuhWGOXZKqzCpIvbCctv3U1Kl3+hoJwgn4n5g+FG/lZR5NKxcu49Vfn+tf3PvALyU3AznE3GfKHUtFOlzhzF4Ubuev2VoO1/DlGKGmZIX4ASJwO+5f8kZGyOn9jv7idsv3q43BjMTNB8wFtrao3Ku1s77aJ27GcBFPnNjP94l48xVoZnFigP7wFFuGq50fhctjbDIWTl539trVzRf1Cfjtllb+MLXD18nf5UCMgh35IozsOSXHpci9faJco5gP6hd3O92hSsqdHYkT+N1ugFpBrbybHNuX3R6RYJNrY7OR3i4VCodstFPaL+a29xtWSZG96oydF8qV/gn5qUNhO+TV3T3h+Wo3F4/F1/F8sHP4Usf4ebs1bsYJuEwX9hzHEudd3B9blAJH4d+ZXgP5mgP1t6/zLCaKYn+uvVf04ZAqbSYsiwRZ+KblZWPCXDywc7a1IOOTU5PTSk1a/bv3OHNQxUHFzKc4cE2EhElv6Vpx/FvcDoFpQv7gZTVn1zfTC80vx0GaRiI969vA/FP39zmUyZh/+/FJsp9HZJ02ffxG7EWC72GnsrMckLE2/gSpJSkOSFN+56hTb/9DYYA/1xkvdYn6vgRUxRuJ+WJLw/2KxeDiEs56tYnf+TS+/ExqtK/XbOHXbzefzP/I4mSsWuv1p5vrv004KzCQWtdvGgwcPHjx48ODBgwcPHjx48ODBgwcPHjyY8b+1u5j851Hz6wAAAABJRU5ErkJggg=='  // Placeholder image URL
    },
    {
        id: 3,
        title: 'Fournir un soutien technique pour les dispositifs d\'assistance',
        organization: 'Handicap International',
        description: "Cette ONG est active en Tunisie, fournissant divers services, y compris la réadaptation, les prothèses, et la défense des droits des personnes handicapées. Ils gèrent également des programmes pour améliorer l'accès à l'éducation et à l'emploi. Plus d'informations sont disponibles sur le site de Handicap International.",
        imageUrl: 'data:image/png;base64,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'  // Placeholder image URL
    }
];

const Opportunities = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        fetch(`/api/post-blogs?populate=*`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Log the data to check its structure
                console.log('Fetched data:', data);

                // Extract the data from the response
                const fetchedOpportunities = data.data
                    .filter(post => post.attributes.subcategory?.data?.attributes?.name === 'Opportunités')
                    .map(post => ({
                        title: post.attributes.Title,
                        organization: post.attributes.Description.map(block => block.children.map(child => child.text).join('')).join('\n'), // Description from the Description field// Organization from the content field
                        description: post.attributes.content || 'Unknown',
                        // Construct the full image URL
                        imageUrl: post.attributes.Mediafiles?.data?.[0]?.attributes?.formats?.large?.url ? `${post.attributes.Mediafiles.data[0].attributes.formats.large.url}` : ''
                    }));

                // Combine fetched opportunities with local volunteer opportunities
                const combinedOpportunities = [...volunteerOpportunities, ...fetchedOpportunities];
                setOpportunities(combinedOpportunities);
            })
            .catch(error => {
                setError(error);
                console.error("There was an error fetching the opportunities!", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <Row>
                <img className="backnavhead" src={backnavhead} alt="Background" />
            </Row>
            <Container className="mt-4">
                <Row>
                    <Col>
                        <h1 className="opportunities-title">Opportunités</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="liens-utiles-description">
                            Explorez les options de travail, de formation, de financement et de bénévolat pour les personnes handicapées en Tunisie. Encouragez l'intégration et le développement en saisissant toutes les occasions d'avancer dans votre carrière et votre vie personnelle.
                        </p>
                    </Col>
                </Row>
                <Row>
  {opportunities.map((opportunity, index) => (
    <Col md={4} key={index} className="mb-4">
      <Card className="h-100 opportunity-card">
        {opportunity.imageUrl ? (
          <Card.Img variant="top" src={opportunity.imageUrl} alt={opportunity.title} className="opportunity-image" />
        ) : (
          <p className="text-center mt-3">No image available</p>
        )}
        <Card.Body>
          <Card.Title>{opportunity.title}</Card.Title>
          <Card.Text>{opportunity.organization}</Card.Text>
          <Card.Text>{opportunity.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

            </Container>
        </>
    );
};

export default Opportunities;