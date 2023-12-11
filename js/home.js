function CreateSection(options) {
  var mnu = document.createElement('div');
  mnu.className = "section-menu";
  var hdr = document.createElement('div');
  hdr.className = "section-header";
  mnu.appendChild(hdr);
  var ttl = document.createElement('h1');
  ttl.innerHTML = "// " + options.Title;
  ttl.className = "section-title";
  mnu.appendChild(ttl);

  var bg = document.createElement('div');
  bg.className = "section-bg";
  mnu.appendChild(bg);

  for (var i = 0; i < 2; i++) {
    var item = options.Contents[i];

    var item_cell = document.createElement('div');
    item_cell.className = "section-contents-cell";
    if (i == 1) item_cell.className += " section-contents-cell-right";
    mnu.appendChild(item_cell);

    var item_ttl = document.createElement('h1');
    item_ttl.innerHTML = "// " + item.Title;
    item_ttl.className = "section-contents-title";
    item_cell.appendChild(item_ttl);

    if (item.Data.Type == "Paragraph") {
      var item_p = document.createElement('p');
      item_p.innerHTML = item.Data.Data;
      item_p.className = "section-contents-paragraph";
      item_cell.appendChild(item_p);
    } else if (item.Data.Type == "ImageSequence") {
      var item_is = document.createElement('div');
      item_is.className = "section-contents-imagesequence";
      item_cell.appendChild(item_is);

      item_is.style.backgroundImage = "url(\"" + item.Data.Data[0][0] + "\")";
      var item_isl = document.createElement('button');
      item_isl.innerHTML = item.Data.Data[0][1];
      item_isl.className = "section-contents-imagesequencelabel";
      item_cell.appendChild(item_isl);

      item_is.setAttribute("ImageCount", item.Data.Data.length);
      item_is.setAttribute("CurrentImage", 0);
      for (var e = 0; e < item.Data.Data.length; e++) {
        item_is.setAttribute("Image" + e, item.Data.Data[e][0]);
        item_is.setAttribute("Label" + e, item.Data.Data[e][1]);
      }

      item_is.addEventListener('click', function(e) {
        var tar = e.target;
        var blowup = document.createElement('div');
        blowup.className = "image-blowup";
        blowup.style.backgroundImage = "url(\"" + tar.getAttribute("Image" + tar.getAttribute("CurrentImage")) + "\")";
        document.body.appendChild(blowup);
        blowup.addEventListener('click', function(e) {
          var tar = e.target;
          tar.parentElement.removeChild(tar);
        });
      });
      
      if (item.Data.Data.length <= 1) continue;

      var item_isbl = document.createElement('button');
      item_isbl.innerHTML = "<";
      item_isbl.className = "section-contents-imagesequencebutton";
      item_isbl.style.left = "0";
      item_cell.appendChild(item_isbl);
      var item_isbr = document.createElement('button');
      item_isbr.innerHTML = ">";
      item_isbr.className = "section-contents-imagesequencebutton";
      item_isbr.style.right = "0";
      item_cell.appendChild(item_isbr);

      item_isbl.addEventListener('click', function(e) {
        var tar = e.target.parentElement.querySelector('.section-contents-imagesequence');
        var c = parseInt(tar.getAttribute("CurrentImage"));
        c -= 1;
        if (c < 0) {
          c = parseInt(tar.getAttribute("ImageCount")) - 1;
        }
        tar.setAttribute("CurrentImage", c);

        tar.style.backgroundImage = "url(\"" + tar.getAttribute("Image" + c) + "\")";
        tar.parentElement.querySelector('.section-contents-imagesequencelabel').innerHTML = tar.getAttribute("Label" + c);
      });
      item_isbr.addEventListener('click', function(e) {
        var tar = e.target.parentElement.querySelector('.section-contents-imagesequence');
        var c = parseInt(tar.getAttribute("CurrentImage"));
        c += 1;
        if (c >= parseInt(tar.getAttribute("ImageCount"))) {
          c = 0;
        }
        tar.setAttribute("CurrentImage", c);

        tar.style.backgroundImage = "url(\"" + tar.getAttribute("Image" + c) + "\")";
        tar.parentElement.querySelector('.section-contents-imagesequencelabel').innerHTML = tar.getAttribute("Label" + c);
      });
    }
  }

  document.body.appendChild(mnu);
}

(function() {
  CreateSection({
    Title: "About Me",
    Contents: [
      {
        Title: "Brief",
        Data: {
          Type: "Paragraph",
          Data: "My name is David J. Cogan. I'm actively pursuing jobs for software engineering. Developing tools, game mechanics, and UI is a passion I love to partake in.<br></br>Currently, the programming languages I know are: C++, C#, Java, JavaScript (and NodeJS), TypeScript, Lua, Python, VBA, HSC. I also know formatting & styling formats such as: HTML, XML/XAML (often used with WPF), CSS, and also data formats like JSON and YAML.<br></br>I develop on Windows as that is my preferred os. My current favorite language is C++ using the MSVC compiler through VS2022. However sometimes I hop over to other tools like Unity."
        }
      },
      {
        Title: "History",
        Data: {
          Type: "Paragraph",
          Data: "I originally started getting into logic based systems (programming) when I first got a game called LittleBigPlanet 3 when I was 11, since I found out about the in-game circuit builder, I got involved in programming, learning over a dozen languages (some I've forgotten about), and just kept learning and practicing. I'm now turning 20 in September of 2023, and I'm optimistic towards my future in programming whether it's for a company, or for my own."
        }
      }
    ]
  });

  CreateSection({
    Title: "Cosmic Engine",
    Contents: [
      {
        Title: "Info",
        Data: {
          Type: "Paragraph",
          Data: "Cosmic Engine is a custom game engine built entirely from the ground up by me. It has gone through many iterations, such as shown in the images (not all iterations have documented photos). Currently the core focus is to support Windows & Linux with Vulkan & DirectX12 using GLFW. I also have plans for supporting Xbox via UWP executable. It's focus is being modular while maintaining a stable core environment. I want to supply complex solutions to the user in simplistic understanding; and of course, the engine is ECS based.<br></br>In the current iteration, I'm going through a massive rewrite so it's more compatible with DirectX12, however I still have lots to learn. I'm also writing a custom UI library called HTML+ to handle both the developer & game interfaces.<br></br>I plan to custom write most of everything in the engine which even includes physics.<br></br>On top of all this, I want to provide developers their own build environment to handle the output of their projects like you can through the VS project configuration window, however, even allow more custom management focused entirely on making updates towards the game small in scale, and faster to read."
        }
      },
      {
        Title: "Images",
        Data: {
          Type: "ImageSequence",
          Data: [
            ["../imgs/s_cosmicengine_panel1.jpg", "First Editor Iteration"],
            ["../imgs/s_cosmicengine_panel2.png", "Fifth Editor Iteration"],
            ["../imgs/s_cosmicengine_panel3.png", "Sixth Editor Iteration"],
            ["../imgs/s_cosmicengine_panel4.png", "Seventh Editor Iteration (Concept)"],
            ["../imgs/s_cosmicengine_panel5.png", "First Launcher Iteration"],
            ["../imgs/s_cosmicengine_panel6.png", "Second Launcher Iteration"]
          ]
        }
      }
    ]
  });

  CreateSection({
    Title: "Halo Scripting Editor",
    Contents: [
      {
        Title: "Info",
        Data: {
          Type: "Paragraph",
          Data: "Halo Scripting Editor (HSE) is a tool (in beta) that I was developing to make programming hsc files easier. \"hsc\" files are custom language files programmed to handle events and sequences in the Halo games. It's a tool I made to help people use syntax, references, and intellisense for their files. I did not fully finish all the features, especially references, documentation window, and automatic backups.<br></br>To this day, all Halo games on MCC have full mod tool support, however my application is designed with the intellisense only for Halo CE."
        }
      },
      {
        Title: "Images",
        Data: {
          Type: "ImageSequence",
          Data: [
            ["../imgs/s_hse.jpg", "First Editor Iteration"]
          ]
        }
      }
    ]
  });

  CreateSection({
    Title: "Citadel",
    Contents: [
      {
        Title: "Info",
        Data: {
          Type: "Paragraph",
          Data: "Citadel is a fan-game I've been working on, it's a reinterpretation of Half-Life 2; and is actually the leading cause of my developing my own game engine. It's still in early stages, and originally started in unity. However I'm currently working on game assets until I can use my engine. I've also done early mockups of the interface using Figma (which of course can be seen on the right). I'm not gonna get into the specifics of the game now, but the main current objective is work on game assets, write up the story and plot points, and develop the game engine."
        }
      },
      {
        Title: "Images",
        Data: {
          Type: "ImageSequence",
          Data: [
            ["../imgs/g_citadel_panel1.jpg", "Unity Main Menu Design"],
            ["../imgs/g_citadel_panel2.png", "New Concept Design (Front)"],
            ["../imgs/g_citadel_panel3.png", "New Concept Design (Bottom, accessed via arrow in first)"]
          ]
        }
      }
    ]
  });
  
  CreateSection({
    Title: "BulletScript",
    Contents: [
      {
        Title: "Info",
        Data: {
          Type: "Paragraph",
          Data: "BulletScript is a custom semi-compiled interpreted language I've been working on for usage in Cosmic Engine and for any other purposes. It's designed to be easily modular, and it's way of working is that it gets compiled into compressed hexcode, and from there is read through a secondary library for the purpose of handling the BulletScript instances. It's style is very similar to TypeScript with a lot of personal changes that take from C++ as well as C#."
        }
      },
      {
        Title: "Images",
        Data: {
          Type: "ImageSequence",
          Data: [
            ["../imgs/s_bulletscript.png", "First Editor Iteration"]
          ]
        }
      }
    ]
  });

  CreateSection({
    Title: "Server Libraries",
    Contents: [
      {
        Title: "Server",
        Data: {
          Type: "Paragraph",
          Data: "My custom server library supports a multitude of custom interfacing through callbacks to allow for dynamic usage; this means I can use this library where and when I need it. This library is not yet done, however is getting quite close, it currently supports TCP, but not UDP, and has no timeout feature.<br></br>On top of all this, I will soon work on a separate RSA encryption library for usage in networking."
        }
      },
      {
        Title: "Client",
        Data: {
          Type: "Paragraph",
          Data: "The client version of the library currently does not support both TCP & UDP, however will be very similar to how the server library is handled, currently I'm using a TCP based test client for the server, in which once the server is fully TCP finished with timeout compatability, I can then move onto the client."
        }
      }
    ]
  });

  CreateSection({
    Title: "HTML+",
    Contents: [
      {
        Title: "Info",
        Data: {
          Type: "Paragraph",
          Data: "HTML+ is a custom single library that will be used in Cosmic Engine for the purpose of handling the UI. All actions for creating, updating, and destroying buffers are handled by the user instead of the libraries, but is done through callbacks. It's style is very similar to HTML however allows for extensive features like templates, and is faster, hopefully to be clocked at 1 draw call per shader resource (by default, all elements should be using 1 shader). It's styled through a custom filetype called fsss (functional super styling script) which is very similar to css, but with slightly different syntax and properties."
        }
      },
      {
        Title: "Images",
        Data: {
          Type: "ImageSequence",
          Data: [
            ["../imgs/s_htmlp_panel1.png", "HTML+"],
            ["../imgs/s_htmlp_panel2.png", "FSSS"]
          ]
        }
      }
    ]
  });

  CreateSection({
    Title: "DataVault",
    Contents: [
      {
        Title: "Info",
        Data: {
          Type: "Paragraph",
          Data: "DataVault is another custom library I've been working on. A custom database setup for the purpose of storing \"containers\" and using keys to find containers. A container can have as many keys as required (as long as there isn't another same value key). It's like json, but only if the data was in one object, and required one of any number of keys to access.<br></br>Each instance of DataVault is stored as a separate file, for example, if you wanted accounts, organizations, and games in the database, you would create 3 databases of those requirements, and they would be saved into 3 separate files, however this library is in really early stages."
        }
      },
      {
        Title: "Storing type",
        Data: {
          Type: "Paragraph",
          Data: "All data is passed through a simple encryption via password, and written into raw uint32_t data, and read back into the vault (database instance) when needed. No plans on better encryption as this data is meant for internal databases."
        }
      }
    ]
  });
}());
