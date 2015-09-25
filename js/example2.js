// Utility function to display log output
function logOutput(output, path) {
    if(path) {
        path = path;
    } else {
        path = $('body')
    }
    path.append("<b>&gt</b> " + output + "<br />");
}

// The raw JSON data
var rawData = {
    'id': 1,
    'name': 'My 1st Category',
    'children': [
        {
            'id': 2,
            'name': 'My 2nd Category',
            'children': [
                {
                    'id': 3,
                    'name': 'An Item 1',
                    'price': 19.99},
                {
                    'id': 4,
                    'name': 'An Item 2',
                    'price': 29.99}

            ]},
        {
            'id': 5,
            'name': 'An Item 3',
            'price': 39.99}
    ]
};

// Factory method
var CategoryOrItemFactory = function(data, options) {
    if (data.children) {
        return new Category(data, options);
    } else {
        return new Item(data, options);
    }
};

// Model definitions
var Item = Backbone.Model.extend();

var Category = Backbone.Model.extend({
    initialize: function() {
        this.children = new Children(this.get("children"));
    }
});

var Children = Backbone.Collection.extend({
    model: CategoryOrItemFactory
});

// Debug function to walk and display model tree
var dumpStructure = function(node, parentName) {
    var nodeName = node.get("name");
    logOutput("node name: "
        + nodeName
        + " (#" + node.get("id") + ")"
        + (parentName ? ", parent: " + parentName : ""), $('body')
    );
    if (node.children) {
        node.children.each(function(childNode) {
            console.log(childNode);
            dumpStructure(childNode, nodeName);
        });
    }
};

// create the root item
var rootItem = new Category(rawData);
dumpStructure(rootItem);

logOutput(new Date());