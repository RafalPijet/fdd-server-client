import { Request, Response, NextFunction } from 'express';
import { post, get, put } from '../routes';
import { controller } from './decorators';
import HttpException from '../exceptions/HttpException';
import Stripe from 'stripe';
import dotenv from 'dotenv';

@controller('/api/payments')
class PaymentController {
    @get('/checkout/session/:amount')
    async getCheckoutSession(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { amount } = req.params;
            const returnRootPath = `${process.env.URL}donate/0`;
            const stripe = new Stripe(process.env.STRIPE_API_KEY || '', {
                apiVersion: '2020-08-27',
            });
            const session = await stripe?.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'pln',
                            product_data: {
                                name: 'Darowizna dla Fundacji Dorośli Dzieciom',
                            },
                            unit_amount: parseInt(amount) * 100 || 1000,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${returnRootPath}#success`,
                cancel_url: `${returnRootPath}#fail`,
            });

            session.url && res.redirect(303, session.url);

        } catch (err) {
            next(new HttpException(404, `Nie udało się stworzyć sesji płatności - ${err}`))
        }

    }
}

