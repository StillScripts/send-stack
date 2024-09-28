import { movies } from '@/db/schema'

import BaseController from './base.controller'

export const prefix = '/movies'
const frontendPrefix = prefix

export class MoviesController extends BaseController<typeof movies> {
	constructor() {
		super(movies, frontendPrefix)
	}
}
