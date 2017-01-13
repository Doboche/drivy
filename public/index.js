'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

function rentalPrice(rental)
{
  var percent=0;
  var priceDay=0;
  var priceKm=0;
  var diffDays=diffDay(rental);
  var carID=rental.carId;
  for (var j=0; j<cars.length;j++)
    {
      if (carID==cars[j].id)
      {
        priceDay = cars[j].pricePerDay;
        priceKm = cars[j].pricePerKm;
      }
    }
    if(diffDays > 1 && diffDays<=4)
    {
      percent = 0.1 * priceDay;
      priceDay = priceDay - percent;
    }
    else if(diffDays>4 && diffDays<=10)
    {
      percent = 0.3 * priceDay;
      priceDay = priceDay - percent;
    }
    else if(diffDays>10)
    {
      percent = 0.5 * priceDay;
      priceDay = priceDay - percent;
    }
  var time =diffDays*(priceDay);
  var distance = rental.distance * priceKm
  rental.price= time + distance + deductible(rental);
  return rental.price;
}

function diffDay(rental)
{
  var dateReturn = new Date(rental.returnDate);
  var datePickup = new Date(rental.pickupDate);
  var timeDiff = Math.abs(dateReturn.getTime() - datePickup.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) +1;
  return diffDays;
}

function commission(rental)
{
  var commission = rentalPrice(rental) - deductible(rental);
  var commission = commission - (70/100)*commission;
  var diffDays = diffDay(rental);
  rental.commission.insurance=commission/2;
  rental.commission.assistance=diffDays;
  rental.commission.drivy=commission-commission/2-diffDays + deductible(rental);
}
function deductible(rental)
{
  if (rental.options.deductibleReduction==true)
  {
    return diffDay(rental)*4;
  }
  else {
    return 0;
  }
}

for (var i=0;i<rentals.length;i++)
{
  rentalPrice(rentals[i]);
  commission(rentals[i]);
}
console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
