const express = require('express');
const path = require('path');
const stripe = require('stripe')('sk_test_51O1zzrHS1eWSG2Pl49aPXm6fmBoT2SsaYfSZhDZo5kMawRGJberekNhac9UnXApIR0vEt4VGYucthzsNS3gK7JB5001939oDmv');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyParser.json());

// Vos routes existantes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'home.html'));
});

app.get('/api/books', (req, res) => {
    const booksData = require('./Public/db/book.json');
    res.json(booksData);
});

app.get('/api/users', (req, res) => {
    const usersData = require('./Public/db/user.json');
    res.json(usersData);
});

app.post('/create-checkout-session', async (req, res) => {
    const { items } = req.body;

    // Convertir vos items au format approprié pour price_data
    const formattedItems = items.map(item => ({
        price_data: {
            currency: item.currency,
            product_data: {
                name: item.name,
                // Vous pouvez également ajouter d'autres propriétés comme description, images, etc.
            },
            unit_amount: parseInt(item.amount), // Assurez-vous que le montant est un entier
        },
        quantity: parseInt(item.quantity), // Assurez-vous que la quantité est un entier
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: formattedItems,
            mode: 'payment',
            success_url: 'http://localhost:8080/cart.html',
            cancel_url: 'http://localhost:8080/success.html',
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la session de paiement' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


