# Blog App Documentation

The Angular Blog App is a web application built using Angular framework, featuring SCSS for styling and employing best practices for code quality, testing, and deployment. This project serves as a platform to showcase blog posts and provide a seamless user experience.

[Visit Website](https://purple-moss-08e6b6a03.5.azurestaticapps.net)

## Setup

To see the project setup and Deployment Guide read the SETUP.md

The following steps are to show how to get startet with this project:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hftm-in2022/angular-blog-app-hamsiga-rajaratnam.git
   ```

2. Navigate into the project directory:

```bash
cd blog-app
```

3. Install the dependencies:

```bash
npm install
```

4. Run the application:

```bash
ng serve
```

5. Open your browser and navigate to:

http://localhost:4200

### Backend Integration

- **CORS Configuration:** Ensure CORS is enabled on the backend to allow the Angular client to access data seamlessly.
- **Data Validation:** Data received from the backend is validated on the client side using Zod schemas for strong type safety.

### Keycloak Authentication

- **Keycloak Instance:**
  - **URL:** `https://d-cap-keyclaok.kindbay-711f60b2.westeurope.azurecontainerapps.io/`
  - **Credentials:**
    - Username: `student@hftm.ch`
    - Password: `Student@1234`
- **Library:** Used `angular-auth-oidc-client` for OpenID Connect and OAuth2 integration.
- **Guard Implementation:**
  - `isAuthenticatedGuard`: Ensures only authenticated users with the `user` role can access protected routes.
  - Role validation implemented using the `hasRole` utility.

---

## CI/CD Pipeline

- Regular commits following the Conventional Commit standard.
- Feature branches (e.g., `loading-data`) for incremental development.
- Pull requests with detailed descriptions and code reviews before merging to the main branch.
- Automated testing and deployment with GitHub Actions.
- Deployment to Azure Static Web Apps for seamless hosting.

---

## Angular File Structure

### **Core**

- `core/auth`
  - `auth.config.ts`: Contains authentication configuration for Keycloak.
  - `auth.service.ts`: Manages authentication and user session.
- `core/guards`
  - `auth.guard.ts`: Implements route guarding based on user roles.
- `core/interceptors`
  - `logging.interceptor.ts`: Logs HTTP request and response details, including method, URL, headers, and body. Additionally, logs errors for failed requests with status and error message.
- `core/services`
  - `blog-backend.service.ts`: Handles API interactions for blog management.
  - `blog-detail-resolver.service.ts`: Preloads data for the blog detail page.
  - `global-error-handler.service.ts`: Centralized error handling.
- `core/sidebar`
  - `sidebar.component.html`: Defines the sidebar's structure and layout.
  - `sidebar.component.scss`: Styles for the sidebar.
  - `sidebar.component.ts`: Manages sidebar functionality.
- `core/stores`
  - `blog-state.store.ts`: Implements Redux-like state management using Signals and RxJS.
- `core/validators`
  - `blog-title.validator.ts`: Validates blog titles for uniqueness.

### **Features**

- `features/add-blog-page`
  - `add-blog-page.component.html`: Form for creating new blogs.
  - `add-blog-page.component.scss`: Styles for the add blog page.
  - `add-blog-page.component.ts`: Handles logic for adding blogs.
  - `add-blog-page.routes.ts`: Lazy-loaded routes for the add blog feature.
- `features/blog-detail-page`
  - `blog-detail-page.component.html`: Displays detailed information about a blog.
  - `blog-detail-page.component.scss`: Styles for the blog detail page.
  - `blog-detail-page.component.ts`: Manages blog detail logic.
  - `blog-detail-page.routes.ts`: Lazy-loaded routes for the blog detail feature.
- `features/blog-overview-page`
  - `blog-overview-page.component.html`: Displays a list of blogs.
  - `blog-overview-page.component.scss`: Styles for the blog overview page.
  - `blog-overview-page.component.ts`: Manages blog overview logic.
  - `blog-overview-page.routes.ts`: Lazy-loaded routes for the blog overview feature.

### **Shared**

- `shared/blog-overview-card`
  - `blog-overview-card.component.html`: Template for individual blog cards.
  - `blog-overview-card.component.scss`: Styles for blog cards.
  - `blog-overview-card.component.ts`: Handles rendering of blog card data.

---

- `features/add-blog-page`
  - Contains components and modules for adding new blogs.
  - Includes a lazy-loaded module for performance optimization.
  - Implements form validation (both synchronous and asynchronous) and a spinner for save operations.
- `features/blog-overview-page`
  - Contains components and modules for displaying blog overviews.
  - Utilizes Angular Resolver to preload data.
  - Implements responsive design with SCSS and Flexbox.
- `features/blog-detail-page`
  - Contains components and modules for detailed blog views.
  - Includes navigation back to the overview.

### **Core**

- `core/services`
  - `BlogBackendService`: Handles all API interactions with the backend.
  - `AuthService`: Manages authentication and user session.
  - `LoadingStateService`: Manages loading states for data operations.
- `core/interceptors`
  - `LoggingInterceptor`: The loggingInterceptor is an Angular HTTP Interceptor that logs details about HTTP requests and responses.

### **Shared**

- Reusable components such as buttons, form elements, and spinners.
- Shared SCSS files for consistent styling.

---

## Patterns

### Smart/Dumb Components

- **Smart Components:** Manage state, API calls, and complex logic.
  - Example: `BlogOverviewPageComponent`, `AddBlogPageComponent`.
- **Dumb Components:** Handle UI rendering and receive data through Inputs/Outputs.
  - Example: `BlogOverviewCardComponent`.

### Redux-based State Management

- Implemented using Signals and RxJS.
- Centralized state management to ensure consistent application state.
- Loading spinner displays during asynchronous operations.

---

## Styling

### SCSS Guidelines

- Custom SCSS variables for colors and spacing.
- Modularized styles for components.
- Sidebar and toolbar styled for mobile and desktop views.
- Unified SCSS patterns for buttons and navigation elements.

---

## Configuration Files

### **Application Configuration**

- `app.config.ts`: Centralized configuration for the application.
  - Sets up router with routes and component input binding.
  - Provides a global error handler for handling errors across the application.
  - Enables animations asynchronously for better performance.
  - Configures the HTTP client with interceptors such as the logging interceptor.
  - Integrates authentication using `angular-auth-oidc-client` and Keycloak.

### **Angular.json**

- Configures build and test setups.
- Includes paths for lazy-loaded modules.

### **Environment Configuration**

- `environment.ts`:
  - `serviceUrl`: Base URL for backend API.
  - `authConfig`: Configuration for Keycloak authentication.

---

## Features

### Blog Overview

- Displays all blogs.
- Responsive layout using Flexbox.

### Blog Detail Page

- Shows detailed information about a blog, including title, content, and author.
- Navigation back to the overview page.
- Resolver ensures data is preloaded before rendering the page.

### Add Blog Page

- Form with validation for `title` and `content` fields.
- Implements synchronous and asynchronous validators for enhanced user feedback.
- Spinner during save operation.
- Button for resetting the form.
- Navigates back to the blog overview upon successful save.

### Authentication

- Login and logout functionality.
- Displays user information in the header or sidebar.
- Guarded routes ensure only authorized users can access sensitive pages.

### Sidebar Navigation

- Responsive sidebar implemented using Angular Material.
- Hamburger menu for mobile devices.
- Dynamic buttons based on user authentication status.
- Fully replaces the header component.

---

## Global Error Handling

- Centralized error handler for HTTP requests.
- Displays user-friendly error messages.

---

## Contribution Workflow

1. Create a feature branch: `git checkout -b feature-name`.
2. Commit changes using Conventional Commit messages.
3. Push branch to the repository: `git push origin feature-name`.
4. Create a pull request with a detailed description.
5. Perform code review and merge upon approval.

---

## Testing

- Unit tests will be implementet in milestone 2.
- Integration tests for routing and lazy-loading functionality.
- Manual testing of user flows like login, blog creation, and navigation.

---
