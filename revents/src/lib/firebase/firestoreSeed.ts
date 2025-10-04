import { initializeApp, cert} from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';
import { events, users } from '../data/sampleData';

const serviceAccount = JSON.parse(readFileSync('./src/lib/firebase/admin-creds.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const auth = getAuth();

async function seedAuthUsers() {
    for(const user of users) {
        try {
            const createdUser = await auth.createUser({
                uid: user.uid,
                email: user.email,
                password: 'Pa$$w0rd',
                photoURL: user.photoURL,
                displayName: user.displayName                
            });

            console.log(`Created user: ${createdUser.uid} - ${createdUser.email}`);

            await db.collection('profiles').doc(createdUser.uid).set({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: Timestamp.now(),
                testData: 'test-me'
            });

        } catch (error) {
            console.log(error);
        }
    }
}

async function seedEvents() {
    const batch = db.batch();
    events.forEach(event => {
        const eventRef = db.collection('events').doc(event.id);
        batch.set(eventRef,{...event, date: Timestamp.fromDate(new Date(event.date))});
    });

    await batch.commit();
    console.log('Seeded events collection');
}

(async () => {
    await seedAuthUsers();
    await seedEvents();
    console.log('Seeding completed');    
})();