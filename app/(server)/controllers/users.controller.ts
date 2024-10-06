import { users } from '@/db/schema'

import BaseController from './base.controller'

export const prefix = '/users'
const frontendPrefix = prefix

export class UsersController extends BaseController<typeof users> {
	constructor() {
		super(users, frontendPrefix)
	}
}
