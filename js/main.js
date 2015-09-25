    var metadata = {
        "elements": [
            {
                "group": {
                    "elements": [
                        {
                            "element": {
                                "isIdentifier": true,
                                "type": "java.lang.Short",
                                "name": "CategoryID"
                            }
                        },
                        {
                            "element": {
                                "type": "java.lang.String",
                                "name": "CategoryName"
                            }
                        },
                        {
                            "element": {
                                "type": "java.lang.String",
                                "name": "Description"
                            }
                        },
                        {
                            "element": {
                                "name": "Picture"
                            }
                        }
                    ],
                    "name": "categories"
                }
            },
            {
                "group": {
                    "elements": [
                        {
                            "element": {
                                "referenceTo": "public.customers.CustomerID",
                                "isIdentifier": true,
                                "type": "java.lang.String",
                                "name": "CustomerID"
                            }
                        },
                        {
                            "element": {
                                "isIdentifier": true,
                                "type": "java.lang.String",
                                "name": "CustomerTypeID"
                            }
                        }
                    ],
                    "name": "customercustomerdemo"
                }
            },
            {
                "group": {
                    "elements": [
                        {
                            "element": {
                                "isIdentifier": true,
                                "type": "java.lang.String",
                                "name": "CustomerTypeID"
                            }
                        },
                        {
                            "element": {
                                "type": "java.lang.String",
                                "name": "CustomerDesc"
                            }
                        }
                    ],
                    "name": "customerdemographics"
                }
            },
            {
                "group": {
                    "elements": [
                        {
                            "element": {
                                "isIdentifier": true,
                                "type": "java.lang.Short",
                                "name": "EmployeeID"
                            }
                        },
                        {
                            "element": {
                                "referenceTo": "public.territories.TerritoryID",
                                "isIdentifier": true,
                                "type": "java.lang.String",
                                "name": "TerritoryID"
                            }
                        }
                    ],
                    "name": "employeeterritories"
                }
            }
        ],
        "name": "public"
    };


    var ElementsCollection = Backbone.Collection.extend({
        model: function(attrs, options) {
            if (attrs.group) {
                return new GroupModel({
                    name: attrs.group.name,
                    elements: new ElementsCollection(attrs.group.elements)
                });
            } else if(attrs.element){
                return new ElementModel(attrs.element, options);
            } else {
                throw 'error';
            }
        }
    });

    var GroupModel = Backbone.Model.extend({
        defaults: {
            name: undefined,
            elements: new ElementsCollection()
        }
    });

    var ElementModel = Backbone.Model.extend({
        defaults: {
            isIdentifier: undefined,
            name: undefined,
            type: undefined,
            referenceTo: undefined
        }
    });



    var GroupView = Backbone.View.extend({
        tagName: 'li',
        template: _.template('<div><%- name %></div>\n<ul></ul>'),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html( this.template( this.model.attributes ) );
            dumpStructure(this.model);
            return this;
        }

    });

    var dumpStructure = function(node) {
        console.log(node);
        var view = new ElementView({model: node});
        this.$el.append(view.render().el);
        if(node.get('elements')) {
            node.get('elements').each(function(childNode) {
                console.log(childNode);
                dumpStructure(childNode);
            });
        }
    };

    //var dumpStructure = function(node, parentName) {
    //    var nodeName = node.get("name");
    //    logOutput("node name: "
    //        + nodeName
    //        + " (#" + node.get("id") + ")"
    //        + (parentName ? ", parent: " + parentName : ""), $('body')
    //    );
    //    if (node.children) {
    //        node.children.each(function(childNode) {
    //            console.log(childNode);
    //            dumpStructure(childNode, nodeName);
    //        });
    //    }
    //};

    var ElementView = Backbone.View.extend({
        tagName: 'li',

        template: _.template('<div class="list-item"><%= name %></div>'),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html( this.template( this.model.attributes ) );
            return this;
        }

    });

    //var GroupView = Backbone.View.extend({
    //    tagName: 'li',
    //
    //    template: _.template('<div class="list-item"><%= name %></div>'),
    //
    //    initialize: function() {
    //        this.render();
    //    },
    //
    //    render: function() {
    //        this.$el.html( this.template( this.model.attributes ) );
    //        return this;
    //    }
    //});

    var elementsCollection = new ElementsCollection( metadata.elements );

    var groupModel = new GroupModel({ name: metadata.name, elements: elementsCollection });

    var groupView = new GroupView({model: groupModel});
    $(document.body).html('<ul class="general-list"></ul>');
    $('.general-list').append(groupView.render().el);


