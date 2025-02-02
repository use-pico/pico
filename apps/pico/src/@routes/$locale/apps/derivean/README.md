# Legacy of DeRivean

This is a little project that continues on the original dream to build a game, just changed
technologies.

Here is part of repository (and application) containing functional strategy game with some interesting ideas.
In general it's a bit more an engine than a game (without configuration it does nothing).

Key concept is simple: build buildings, produce goods, discover new buildings, new goods.

## Note to source code

I've decided to experiment with low-abstraction model, thus a lot of stuff is in "strange places", but it's intentional
as the codebase is not small and project is living.

Also, it's a client-only application, literally id uses sqlite in browser, so you own all the data, there is no
need for a server at all (only static assets webserver).

## Images

Default game files are using generated images using Flux. Yaaay, free graphics designer. So, because of Flux, they cannot
be used commercially.

## Architecture

Where you see usage of kysely and direct access to SQL, in "real world" in those places may be server-actions, so the code
may look very similar.

The reason I'm using client-only code is simple invalidation, application itself is not such heavy (it mainly depends on your game).

## Some interesting features

- It's up to you to define resource, buildings, regions (lands)
- You may provide even images, so a game could look nice
- There are exclusive buildings, so when you have A, you may not be able to build B
- There are hidden production lines unless you have enough resources/built required buildings
- Also complex editor is available, so you can see dependency graph of you buildings (technology tree)
- Transportation is clever - buildings are looking for closest resources, accounting even for the road length
- Nice UI, I'm proud of it
- Root management and editor is quite usable
- React Flow powers the main rendering
- Client-side only, so there is no need for server
- You can create and choose fractions, so the gameplay may vary on what you build
- Nice default graphics
- Transport queue priority, construction priority
- Clever UI, so you can see, what's going on (like resource transportation, goods production and so on)
- Language independent - you create a game for your language, only base of the app is translated into supported languages
