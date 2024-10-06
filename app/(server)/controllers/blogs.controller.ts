import { blogs } from '@/db/schema'

import BaseController from './base.controller'

export const prefix = '/blogs'
const frontendPrefix = prefix

export class BlogsController extends BaseController<typeof blogs> {
	constructor() {
		super(blogs, frontendPrefix)
	}
}
