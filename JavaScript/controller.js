import * as module from "./model";
import * as view from "./Views/view";

// module.testing();

view.createObjects(`<div class="circle"></div>`, `.habit-progress`);

view.createObjects(`<div class="circle"></div>`, `.days`);

view.createObjects(`<div class="circle"></div>`, `.notes`);
