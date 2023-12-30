# uv-2.0-pkg
Used to support Two versions of Ultraviolet!

How to use?

Install the package
"uv-2.0-pkg": "github:rxfe-a/uv-2.0-pkg#main"

import { uv2Path } from "uv-2.0-pkg";
import the package into your index.js

app.use("/uv2/", express.static(uv2Path));
done!

any code with the new uv instead of uv it is uv2
