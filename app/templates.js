angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('app/components/home/home.html','\n<div class="container-fluid">\n    <div class="row">\n        <div class="col-md-5">\n            <div id="board1" style="width: auto"></div>\n        </div>\n        <div class="col-md-7">\n            asd\n        </div>\n    </div>\n</div>\n\n\n\n\n');
$templateCache.put('app/components/layout/layout.html','\n<div class="container-fluid">\n    <div class="row">\n        <div class="col-md-10">\n            <div ui-view />\n        </div>\n        <div class="col-md-2">\n            asd\n        </div>\n    </div>\n</div>\n\n\n');}]);