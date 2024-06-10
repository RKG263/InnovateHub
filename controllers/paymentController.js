import Stripe from "stripe";



export const genratePaymentLinkController = async(req, res, next)=>{

        try{
            console.log(req.body);
            const stripe  = Stripe(process.env.STRIPE_SECRET_API_KEY);
            
            // create product
            
    
            
            const mentor = await stripe.products.create({
                name: `Get mentorship with ${req.body.name}`,
                default_price_data : {
                    currency :   'INR',
                    unit_amount: Number(req.body.amount)*100,
                },
                shippable : false,
        
              });

              console.log(mentor);
              console.log("we got mentor result");

            //generate link
          
            
            const session = await stripe.checkout.sessions.create({
            
              cancel_url :  `${process.env.VITE_URL}/explore`,
              success_url : `${process.env.VITE_URL}/`,
              line_items: [
                {
                  price: mentor.default_price,
                  quantity: 1,
                },
              ],
              mode: 'payment',
              billing_address_collection : "auto",
              invoice_creation : {
                enabled : true,
              }
            });


            console.log(session);

            res.status(200).send({
                url : session.url,
                productId : mentor.id
            });


        }catch(err)
        {
            console.log(err);
            next(err);
        }
}




export const deleteProductController =  async(req, res, next)=>{

    try{

        const stripe  = Stripe(process.env.STRIPE_SECRET_API_KEY);
        
        const deleted = await stripe.products.del(req.body.planID);

        console.log(deleted);

        res.status(200).send({
            success : true,
            message : "Plan deleted successfully",
            deleted
        })


    }catch(err)
    {
        console.log(err);
        next(err);
    }
}

