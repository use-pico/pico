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
