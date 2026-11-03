# Travlr Getaways — CS-465 Module Two

This project uses Express MVC routing and HBS templates for the `/travel` page, per the Module Two Full Stack Guide (pp. 76–88). The remaining `.html` files stay in `public` intentionally; they are converted in later assignments.

## Run locally

1. Open the `travlr` folder in VS Code or a terminal.
2. Run `npm install` (requires internet access).
3. Run `npm start`.
4. Open `http://localhost:3000/travel` to test the controller, route, layout, and header/footer partials.
5. Open `http://localhost:3000/travel.html` to compare with the original static page.

`/` renders the original home page through the main controller and an HBS view. Other static pages remain at `/rooms.html`, `/meals.html`, etc.

## Git branch (in your existing local repository)

Do not replace your Git history with the files in this ZIP. Copy changed files into your original repository and run:

```sh
git checkout -b module2
git add .
git commit -m "Module 2 completed baseline"
git push --set-upstream origin module2
```

If `module2` already exists, use `git switch module2` instead of creating it. This ZIP does not contain a Git repository or a pushed branch.

Note: The shared layout file is retained under `app_server/views/layouts` as specified in the guide; each HBS view is also self-contained so its document markup renders reliably with the standard `hbs` view engine.
