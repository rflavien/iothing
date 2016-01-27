module.exports = actionBehavior;

function actionBehavior(thing)
{
    thing.actions = [];
    thing.nb_actions = 0;

    thing.action = function(name, action) {
        this.actions[name] = action;
        this.nb_actions += 1;
    };

    thing.run = function(name)
    {
        this.actions[name].apply(this);
    }
};
