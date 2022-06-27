const form = document.querySelector('#searchForm');
const res = document.querySelector('#resTable');
const cont = document.getElementById("allContaint");

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const ctype = form.elements.coinType.value;
    const cutype = form.elements.currencyType.value;
    cont.classList.add('mainClick');
    cont.classList.remove('main');    
    fetchPrice(ctype,cutype);
   
});

const fetchPrice = async(ctype,cutype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=${cutype}`);
    
    const price = r.data.coin.price;
    const vol = r.data.coin.volume;
    const rank=r.data.coin.rank;
    const change =r.data.coin.priceChange1d;
    const changeweek=r.data.coin.priceChange1w;
    const coin = r.data.coin.name;
    const supply=r.data.coin.availableSupply;
    const symbol=r.data.coin.symbol;
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
        Value (${cutype})
    </td>
</tr>
<tr>
    <td>${coin} (${symbol})price</td>
    <td style="color:${col};"><span style="font-size: 1.3em;">${price}</span></td>
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
    <td style="color:${col};">${changeweek} </td>
    </tr>
<tr>
    <td>Change (24hrs)</td>
    <td style="color:${col};">${change} </td>
</tr>`;
}
