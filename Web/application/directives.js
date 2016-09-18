application.directive("ngMatch", [function() {
    
    var link = function(scope, element, attributes, controller) {
        
        // ngModelController
        controller.$validators.match = function() {
            
            var name = attributes["ngMatch"];
            
            if(!name)
                return;
                
            var referenceValue = angular.element(document).find("input[name=" + name  + "]").val();
            var value = element.val();
            
            var test = referenceValue == value;
            
            return test;
            
        };
        
    };
    
    var directive = {
        link: link,
        restrict: "A",
        require: "ngModel"
    };
    
    return directive;
    
}]);

application.directive("ngEmail", [function() {
    
    var link = function(scope, element, attributes, controller) {
        
        // ngModelController
        controller.$validators.email = function() {
                        
            var name = attributes["ngEmail"];
            
            if(name == undefined)
                return;
            
            var value = element.val();
            
            var pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            
            var test = pattern.test(value);
            
            return test;
            
        };
        
    };
    
    var directive = {
        link: link,
        restrict: "A",
        require: "ngModel"
    };
    
    return directive;
    
}]);

application.directive('ngMenu', ['$http', function($http) {
    
    var link = function(scope, element, attributes, controller) {
        
        var url = attributes['ngMenu'];
        
        if(typeof(url) !== 'string')
            throw "You must pass a url!!";
            
        var render = function(items, _class)
        {
            var rootContainer = angular.element("<div>")
                                       .addClass(_class);
            
            for(var i = 0; i < items.length; i++)
            {
                var item = items[i];
                
                var container = angular.element("<div>")
                                       .addClass("ngMenuItem");
                
                var anchor = angular.element("<a>").attr("href", "javascript:void();")
                                                   .text(item.text)
                                                   .on("click", function(event) {

                                                        var subMenu = angular.element(event.toElement).next();

                                                        var opened = subMenu.data("opened");

                                                        if(opened)
                                                        {
                                                            subMenu.css("max-height", "0px");
                                                            subMenu.data("opened", false);
                                                        }
                                                        else
                                                        {
                                                            var items = subMenu.find("div");
                                                            var totalItems = items.length;
                                                            var itemSize = items.eq(0).prop("offsetHeight");
                                                            subMenu.css("max-height", totalItems * itemSize + "px");
                                                            subMenu.data("opened", true);
                                                        }

                                                  });
                
                if(item.url !== undefined && typeof(item.url) === 'string' && item.url !== '')
                {
                    anchor = anchor.attr("href", item.url)
                                   .off("click");
                }
                                         
                if(item.items !== undefined && item.items instanceof Array && item.items.length > 0)
                {
                    var subMenu = render(item.items, "ngSubMenu")
                                  .css({
                                    "overflow-y": "hidden",
                                    "max-height": "0",
                                    "transition": "max-height 0.5s cubic-bezier(0, 1, 0.5, 1)"
                                  })
                                  .data("opened", false);
                    
                    container.append(anchor)
                             .append(subMenu);
                }
                else
                    container.append(anchor);
            
                rootContainer.append(container);
            }
            
            return rootContainer;
        }
            
        $http.get(url)
             .then(function(response) {
                 
                 if(response.status === 200)
                 {
                     var menu = render(response.data, "ngMenu");
                     element.append(menu);
                 }
                 else
                     throw response.status + " - " + response.statusText;
                 
             }, function(response) {

                 throw response.status + " - " + response.statusText;
                 
             });
        
    };
    
    var directive = {
        link: link,
        restrict: "A"
    };
    
    return directive;
    
}]);