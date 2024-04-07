<script>
    /** @type {import('./$types').PageData} */
    export let data;
    const teamMembers = [
    { name: 'Andrei', role: 'Designer', image: 'image/Andrei.png' },
    { name: 'Dylan', role: 'Developer', image: 'image/Dylan.png' },
    { name: 'David', role: 'Developer', image: 'image/David.png' },
    { name: 'Daniel', role: 'Developer', image: 'image/Daniel.png' }
  ];

</script>

<div class="text">
    <div class="meet-the-team">
        <h1>Meet the Team</h1>
        <div class="team-members">
            {#each teamMembers as member}
            <div class="team-member">
              <img src={member.image} alt={member.name} />
              <h2>{member.name}</h2>
                <p>{member.role}</p>
            </div>
            {/each}
        </div>
        <div class="website-description">
            <div class="white-box">
                <p>
                    We plan to create a "social media'' website designed for photographers to showcase their work and discover photos from other people. It will primarily be focused on "professional" users who want to have a place to store high quality images and showcase their work
                </p>
            </div>
        </div>
    </div>
</div>


<style>

    .text {
        position: relative;
        width: 100%;
        height: 100vh;
        color: var(--gradient-black);
        text-align: center;
        padding: 4em 0.5em 0.5em 0.5em;
        box-sizing: border-box;
        pointer-events: none;
    }

    .meet-the-team {
        position: absolute;
        left: 0;
        width: 100%;
        background-color: var(--color-light-gray);
        color: var(--gradient-black);
        padding: 5vh 0 0 0;
    }

    .team-members {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    .team-member {
        text-align: center;
    }

    .team-member img {
        width: 150px;
        border-radius: 50%;
    }

    .website-description {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .white-box {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        max-width: 400px
    }

    :global(body) {
        margin: 0;
        padding: 0;
        background-color: var(--color-light-gray);
    }

</style>
