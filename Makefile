# Makefile

serve:
	@(cd server && yarn install)
	@(cd server && yarn ts-node main.ts)

test:
	@yarn test:unit