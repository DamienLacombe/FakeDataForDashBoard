class Shop {
    constructor(...categories) {

        for (let i = 0; i < categories.length; i++) {
            
            let tab = [];

            this[categories[i]] = tab;
        
            getArticles(categories[i])
            .then(produits => {
                for (i = 0; i < produits.length; i++) {
                    tab.push(new Article(produits[i]));
                }
            })
        }
    }
}


class Article {
    constructor({...infos}){
        Object.assign(this, infos);
        
        this.vente = {
            2021 : new Year, 
            2022 : new Year
        }   
    }
}

class Year {
    constructor(janvier, fevrier, mars, avril, mai, juin, juillet, aout, septembre, octobre, novembre, decembre) {
        this.janvier = new Month(31).addDay();
        this.fevrier = new Month(28).addDay();
        this.mars = new Month(31).addDay();
        this.avril = new Month(30).addDay();
        this.mai = new Month(31).addDay();
        this.juin = new Month(30).addDay(); 
        this.juillet = new Month(31).addDay();
        this.aout = new Month(31).addDay();
        this.septembre = new Month(30).addDay(); 
        this.octobre = new Month(31).addDay();
        this.novembre = new Month(30).addDay();
        this.decembre = new Month(31).addDay();  
    }
}

class Month {
    constructor(nbr) {
       this.nbr = nbr
    }
    addDay() {
        let dailySales = [];
                
        for (let i = 0; i < this.nbr; i++) {
            
            const percent = Math.floor(Math.random() * 100);
            
            if (percent <= 15) {
                dailySales.push(0);
            } else if (percent > 15 && percent <= 40) {
                dailySales.push(1);
            } else if (percent > 40 && percent <= 65) {
                dailySales.push(2);
            } else if (percent > 65 && percent <= 85) {
                dailySales.push(3);
            } else {
                dailySales.push(4);
            }
        }
        return dailySales;
    }
}

function getArticles(category) {
    return fetch(`https://fakestoreapi.com/products/category/${category}`, {
        method: "GET"
    })
    .then(res => res.json())
    .then(articles => articles)
}

function getCategories() {
    return fetch('https://fakestoreapi.com/products/categories',{
        method: "GET"
    })
    .then(res => res.json())
    .then(categories => categories)
} 

export async function addShop() {
    
    let shop;  
    
    await getCategories()
    .then(categories => {
        shop =  new Shop(...categories); 
    })
    
    return shop;
}


