const book = {
  title: 'Ego is the enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penguin'
  }
};

const { name: publisherName = 'self-published' } = book.publisher;

console.log(publisherName);

const adress = [
  'prinses wilhelminastraat 20',
  'leiden',
  'Zuid-Holland',
  '2313AW'
];

const [street, city, province, zip] = adress;

console.log(`You are in ${city}, ${province}.`);
