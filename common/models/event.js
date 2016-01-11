module.exports = function(Event) {

     Event.observe('before save', function updateTimestamp(ctx, next) {
        if (ctx.instance) {
            ctx.instance.updated = new Date();
        } else {
            ctx.data.updated = new Date();
        }
        console.log('HUHUHUHUHU');
        next();
    });


};
