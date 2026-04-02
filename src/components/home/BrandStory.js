export default function BrandStory() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -mr-32 -mt-32 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8 block">Our Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-black text-primary-900 mb-10 leading-tight tracking-tight uppercase">
            Fashion that feels as <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-gray-400">good as it looks.</span>
          </h2>
          <div className="space-y-8">
            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-light italic">
              "We don't just make clothes. We craft the backdrop for your daily adventures. Every thread is a testament to our commitment to quality and comfort."
            </p>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left mt-16">
              <div>
                <h4 className="font-bold text-primary-900 mb-3 uppercase tracking-wider">Uncompromising Quality</h4>
                <p className="text-gray-500 leading-relaxed">Every piece is made from premium, sustainably sourced cotton. Designed to withstand the test of time and trend.</p>
              </div>
              <div>
                <h4 className="font-bold text-primary-900 mb-3 uppercase tracking-wider">Made for Everyone</h4>
                <p className="text-gray-500 leading-relaxed">Inclusivity is at our core. From size range to style variety, we ensure there's a perfect fit for every member of the family.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
