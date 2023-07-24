const saveScrapedVideoIdsFromJson = require('./saveVideoIds');

const seedData = async () => {
    try {
        await saveScrapedVideoIdsFromJson();
        console.log('Data seeding complete.');
    } catch (error) {
        console.error('Error seeding data:'. error.message);
    }
}

seedData();