class ActorGURPS<SubType extends Actor.SubType = Actor.SubType> extends Actor<SubType> {
	// Return collection of Users that have ownership on this actor
	/**
	 * @returns array of Users that have ownership on this actor
	 */
	get owners(): User[] {
		return game.users?.filter(user => this.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)) ?? []
	}

	/* -------------------------------------------- */
}

export { ActorGURPS }
