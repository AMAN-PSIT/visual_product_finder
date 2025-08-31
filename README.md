
# **Project Documentation** 

**Project Name:** Visual Product Finder  
**Developed By:** Aman KR Singh  
**Frontend:** React.js  
**Backend:** FastAPI  
**Database:** SupabaseDB  
**ML Model:** ViT-B/32 (CLIP)  
**Deployment:** Frontend on Vercel, Backend on Railway  

---

## **1. Introduction**
Visual Product Finder is a web application designed to allow users to search for products by uploading images. Instead of typing keywords, users can simply provide an image, and the system finds visually similar items from the database.

---

## **2. Objectives**
- Enable visual product search.
- Provide an intuitive, responsive UI.
- Use machine learning for accurate similarity detection.
- Make the system scalable with a modern backend and cloud database.

---

## **3. System Architecture**

**Frontend (React)**  
- Provides a user-friendly interface for uploading images.  
- Calls the backend API for image processing.  
- Displays search results dynamically.

**Backend (FastAPI)**  
- Receives the uploaded image via API.  
- Uses the ViT-B/32 model to generate vector embeddings.  
- Queries SupabaseDB for the most similar embeddings and returns results.

**Database (SupabaseDB)**  
- Stores product metadata and precomputed vector embeddings.  
- Supports fast vector-based search for similarity.

**ML Model (ViT-B/32)**  
- Part of the CLIP framework.  
- Generates vector embeddings from images.  
- Provides robust visual similarity measurements.

---

## **4. Features**
- Image upload and visual search.
- Real-time results using vector embeddings.
- Clean and responsive UI.
- Scalable and modular backend design.

---

## **5. Deployment**
- **Frontend:** Hosted on Vercel ([Link](https://visual-product-finder-w9i6-git-main-aman-psits-projects.vercel.app/))  
- **Backend:** Hosted on Railway ([Link](https://visualproductfinder-production.up.railway.app/search/image))  
---

## **6. Technologies**
- React.js, JavaScript, HTML, CSS
- FastAPI, Python
- SupabaseDB
- CLIP ViT-B/32
- Vercel & Railway

---

## **7. Usage Instructions**
1. Open the frontend link.  
2. Upload an image of a product.  
3. Wait for the backend to process the image.  
4. View the returned visually similar products.  

---

## **8. Future Improvements**
- Add support for multiple image uploads at once.  
- Improve search performance with batch embeddings.  
- Implement user authentication for personalized recommendations.  
- Add a feedback loop for improving similarity matching.  

---

I have also given a commands .txt to test model at local or is you are not able to recall commands

