import Hogan from '/var/www/avisame/assets/node_modules/hogan.js/lib/hogan.js' 
const card = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"w-full flex justify-center\">");t.b("\n" + i);t.b("  <div class=\"w-24 my-2 mx-4 rounded-full overflow-hidden\">");t.b("\n" + i);t.b("    <img class=\"w-full\" src=\"");t.b(t.v(t.f("avatar",c,p,0)));t.b("\" alt=\"\">");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<div class=\" w-full my-4 px-4 text-center\">");t.b("\n" + i);t.b("  <p class=\"text-sm font-bold my-2\">");t.b(t.v(t.f("area",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("  <p class=\"text-xs  my-2\">");t.b(t.v(t.f("position",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("  <p class=\"text-xs my-2\">");t.b(t.v(t.f("name",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<div class=\"w-full my-4 px-4 flex justify-center\">");t.b("\n" + i);t.b("  <button class=\"flex justify-center items-center text-sm text-gray-600\" data-type=\"button\" type=\"button\" name=\"profile\">");t.b("\n" + i);t.b("    <i class=\"far fa-eye\"></i>");t.b("\n" + i);t.b("    <p class=\"ml-2\">ver perfil</p>");t.b("\n" + i);t.b("  </button>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}); 
export {card} 