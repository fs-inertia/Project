const form = document.querySelector('#searchForm');
const res = document.querySelector('#resTable');
const cont = document.getElementById("allContaint");

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const ctype = form.elements.coinType.value;
    cont.classList.add('mainClick');
    cont.classList.remove('main');    
    fetchPrice(ctype);

});

const fetchPrice = async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    showPrice(r.data.coin);
}


const showPrice = (coinData)=>{
    const price = coinData.price;
    const vol = coinData.volume;
    const rank=coinData.rank;
    const change = coinData.priceChange1d;
    const changeweek=coinData.priceChange1w;
    const coin = coinData.name;
    const supply=coinData.availableSupply;
    const curr = 'USD';
    const symbol=coinData.symbol;
    var col= "green";
    var colour="black";
    if(change<0){
        col = "red";
    }
    if(rank<=10)
    {
   colour="red";
    }
    res.innerHTML = `<tr class="bg-primary" style="color: white;">
    <td>
        Property
    </td>
    <td>
        Value
    </td>
</tr>
<tr>
    <td>${coin} (${symbol})price</td>
    <td style="color:${col};"><span style="font-size: 1.3em;">${price}</span> ${curr}</td>
</tr>
<tr>
    <td>Volume (24hrs)</td>
    <td>${vol}</td>
</tr>
<tr>
    <td>Rank</td>
    <td style="color:${colour};">${rank}</td>
</tr>
<tr>
    <td>AvailableSupply</td>
    <td>${supply}</td>
    </tr>
<tr>
    <td>Change (1 week)</td>
    <td style="color:${col};">${changeweek} ${curr}</td>
    </tr>
<tr>
    <td>Change (24hrs)</td>
    <td style="color:${col};">${change} ${curr}</td>
</tr>`;
};