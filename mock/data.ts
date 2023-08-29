import { faker } from '@faker-js/faker'

export interface Category {
  id: number
  parent_id: number | null
  name: string
  children?: Category[]
}

export interface Article {
  id: number
  category_id: number
  title: string
  image?: string
  status: boolean
  created_at: string
}

export interface User {
  id: number
  role_id: number
  username: string
  password: string
  nickname: string
  avatar: string
}

export interface Role {
  id: number
  name: string
  permission?: Record<string, any>
}

export interface Setting {
  title: string
  logo: string
  favicon: string
  footer: string
  theme: string
  layout: string
  fixedHeader: boolean
  fixedSideBar: boolean
  fixedTabs: boolean
}

class MockData {
  private static instance: MockData

  private categoryCounter = 0
  private articleCounter = 0
  private userCounter = 0
  private roleCounter = 0

  private articles: Article[] = []
  private categories: Category[] = []
  private users: User[] = []
  private roles: Role[] = []
  private setting: Setting = {
    title: 'Dux Web',
    logo: '',
    favicon: '',
    footer: '',
    theme: 'default',
    layout: 'side',
    fixedHeader: true,
    fixedSideBar: true,
    fixedTabs: true,
  }

  constructor() {
    this.initializeDefaultData()
    console.log('init mock database')
  }

  private generateCategoryId(): number {
    this.categoryCounter++
    return this.categoryCounter
  }

  private generateArticleId(categoryId: number): number {
    this.articleCounter++
    return categoryId * 1000 + this.articleCounter
  }
  private generateUserId(): number {
    this.userCounter++
    return this.userCounter
  }
  private generateRoleId(): number {
    this.roleCounter++
    return this.roleCounter
  }

  private initializeDefaultData(): void {
    this.createCategories()
    this.createArticles()
    this.createDefaultUser()
    this.createDefaultRole()
  }

  private createRandomCategories(levels: number, parentId: number | null = null): Category[] {
    if (levels === 0) {
      return []
    }

    const categories = []

    for (let i = 1; i <= 10; i++) {
      const id = this.generateCategoryId()
      const category = {
        id: id,
        parent_id: parentId,
        name: faker.lorem.words({
          min: 1,
          max: 4,
        }),
        children: this.createRandomCategories(levels - 1, id),
      }
      categories.push(category)
    }

    return categories
  }

  private createCategories(): void {
    this.categories = this.createRandomCategories(3)
  }

  private createRandomArticles(category: Category): void {
    for (let i = 1; i <= 100; i++) {
      this.createArticle({
        id: this.generateArticleId(category.id),
        category_id: category.id,
        title: faker.lorem.sentences(),
        image: faker.image.url(),
        status: faker.datatype.boolean(),
        created_at: faker.date.past().toISOString(),
      })
    }
  }

  private createArticles(): void {
    const categories = this.listCategories()
    categories.forEach((category) => {
      this.createRandomArticles(category)
    })
  }

  private createDefaultUser(): void {
    this.createUser({
      id: 1,
      role_id: 1,
      username: 'admin',
      password: '123456',
      nickname: 'dux',
      avatar: '',
    })
  }

  private createDefaultRole(): void {
    this.createRole({
      id: 1,
      name: 'Admin Group',
      permission: {},
    })
  }

  // Article methods
  listArticles(): Article[] {
    return this.articles
  }

  oneArticle(id: number): Article | undefined {
    return this.articles.find((article) => article.id === id)
  }

  createArticle(newArticle: Article): void {
    this.articles.push({
      ...newArticle,
      id: this.generateArticleId(newArticle.category_id),
      created_at: new Date().toISOString(),
    })
  }

  editArticle(editedArticle: Article): void {
    const index = this.articles.findIndex((article) => article.id === editedArticle.id)
    if (index !== -1) {
      this.articles[index] = editedArticle
    }
  }

  delArticle(id: number): void {
    const index = this.articles.findIndex((article) => article.id === id)
    if (index !== -1) {
      this.articles.splice(index, 1)
    }
  }

  // Category methods
  listCategories(): Category[] {
    return this.categories
  }

  oneCategory(id: number): Category | undefined {
    return this.findCategoryRecursive(this.categories, id)
  }

  createCategory(newCategory: Category): void {
    if (!newCategory.parent_id) {
      this.categories.push({ ...newCategory, id: this.generateCategoryId() })
    } else {
      const parentCategory = this.findCategoryRecursive(this.categories, newCategory.parent_id)
      if (parentCategory) {
        if (!parentCategory.children) {
          parentCategory.children = []
        }
        parentCategory.children.push({ ...newCategory, id: this.generateCategoryId() })
      }
    }
  }

  editCategory(editedCategory: Category): void {
    const index = this.categories.findIndex((cat) => cat.id === editedCategory.id)
    if (index !== -1) {
      this.categories[index] = editedCategory
    }
  }

  delCategory(id: number): void {
    this.removeCategoryRecursive(this.categories, id)
  }

  private findCategoryRecursive(categories: Category[], id: number): Category | undefined {
    for (const category of categories) {
      if (category.id === id) {
        return category
      } else if (category.children) {
        const foundCategory = this.findCategoryRecursive(category.children, id)
        if (foundCategory) {
          return foundCategory
        }
      }
    }
    return undefined
  }

  private removeCategoryRecursive(categories: Category[], id: number): void {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === id) {
        categories.splice(i, 1)
        return
      } else if (categories[i].children) {
        this.removeCategoryRecursive(categories[i].children as Category[], id)
      }
    }
  }

  // User methods
  listUsers(): User[] {
    return this.users
  }

  oneUser(id: number): User | undefined {
    return this.users.find((user) => user.id === id)
  }

  createUser(newUser: User): void {
    this.users.push({ ...newUser, id: this.generateUserId() })
  }

  editUser(editedUser: User): void {
    const index = this.users.findIndex((user) => user.id === editedUser.id)
    if (index !== -1) {
      this.users[index] = editedUser
    }
  }

  delUser(id: number): void {
    const index = this.users.findIndex((user) => user.id === id)
    if (index !== -1) {
      this.users.splice(index, 1)
    }
  }

  // Role methods
  listRoles(): Role[] {
    return this.roles
  }

  oneRole(id: number): Role | undefined {
    return this.roles.find((role) => role.id === id)
  }

  createRole(newRole: Role): void {
    this.roles.push({ ...newRole, id: this.generateRoleId() })
  }

  editRole(editedRole: Role): void {
    const index = this.roles.findIndex((role) => role.id === editedRole.id)
    if (index !== -1) {
      this.roles[index] = editedRole
    }
  }

  delRole(id: number): void {
    const index = this.roles.findIndex((role) => role.id === id)
    if (index !== -1) {
      this.roles.splice(index, 1)
    }
  }

  // Setting methods
  oneSetting(): Setting {
    return this.setting
  }

  editSetting(editedSetting: Setting): void {
    this.setting = { ...this.setting, ...editedSetting }
  }

  static getInstance(): MockData {
    if (!MockData.instance) {
      MockData.instance = new MockData()
    }
    return MockData.instance
  }
}

export default MockData
