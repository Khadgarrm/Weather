window.onload = function() {
    window.weather = null;

    const renderWeather = weather => {
        let htmlStr = '';
        let selectStr = '<option value="">Not selected</option>';
        for(let w of weather) {
            htmlStr += `<tr>
            <td>${w.temperature}</td>
            <td>${w.wind}</td>
            <td>${w.description}</td>
        </tr>`;

            selectStr += `<option value="${weather.day}">${country.day}</option>`;
        }
        if(!weather.length) {
            htmlStr = '<tr><td colspan="8" class="text-center">Не найдено</td></tr>'
        }
        document.querySelector('table > tbody').innerHTML = htmlStr;
        let select = document.getElementsByClassName('weather-select');
        if(select && select.length) {
            select[0].innerHTML = selectStr;
        }
    };

    const getData = () => {
        let weather = [];
        fetch('https://goweather.herokuapp.com/weather/%7Bcity%7D')
            .then(res => res.json()).then(data => {
            weather = data.map(w  => {
                let {temperature, wind, description, forecast } = w;
                return {
                    temperature: temperature, wind, description, forecast
                };
            });
            window.weather = weather;
            renderWeather(weather);
            setListeners();
        });
    }

    getData(); 

  