export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 border-b border-gray-100 pb-8">About Urban Threads</h1>
        
        <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
          <p className="text-xl text-gray-900 font-medium">
            Urban Threads was created with one simple idea — to make everyday fashion comfortable, affordable, and stylish.
          </p>
          
          <p>
            We design T-shirts for real people and real life — for work, weekends, and everything in between. 
            Our focus is on delivering high-quality clothing that helps you express yourself without compromising comfort.
          </p>

          <p>
            From the beginning, we've been committed to using the finest materials and ethical manufacturing processes. 
            Every URBAN THREADS garment is a testament to our dedication to quality and style.
          </p>

          <div className="bg-gray-50 p-8 rounded-xl mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p>
              Our mission is to deliver high-quality clothing that helps you express yourself without compromising comfort. 
              We believe that when you feel good in what you wear, you can focus on making memories and living your story.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
