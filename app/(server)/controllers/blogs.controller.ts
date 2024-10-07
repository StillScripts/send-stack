import { blogs } from '@/db/schema'

import BaseController from './base.controller'

export const prefix = '/blogs'
const frontendPrefix = '/blog'

export class BlogsController extends BaseController<typeof blogs> {
	constructor() {
		super(blogs, frontendPrefix)
	}
}
